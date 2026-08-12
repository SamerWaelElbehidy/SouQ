import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { OtpPurpose } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { OtpService } from '../otp/otp.service';
import { MailService } from '../mail/mail.service';
import { RedisService } from '../redis/redis.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly otp: OtpService,
    private readonly mail: MailService,
    private readonly redis: RedisService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ---------------------------------------------------------------
  // Registration (email + password) — account stays unverified until
  // the OTP sent to the address on file is confirmed.
  // ---------------------------------------------------------------
  async register(dto: RegisterDto): Promise<{ message: string }> {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      // Same message whether the email is taken or invalid in some other way —
      // avoids leaking which emails are already registered.
      throw new ConflictException('تعذر إنشاء الحساب بهذه البيانات');
    }

    const passwordHash = await argon2.hash(dto.password);
    await this.users.createLocal({
      fullName: dto.fullName,
      email: dto.email,
      passwordHash,
    });

    const code = await this.otp.generate(dto.email, OtpPurpose.REGISTER);
    await this.mail.sendOtpEmail(dto.email, code);

    return { message: 'تم إنشاء الحساب، تحقق من بريدك لإدخال رمز التفعيل' };
  }

  async resendOtp(email: string, purpose: OtpPurpose = OtpPurpose.REGISTER): Promise<{ message: string }> {
    const user = await this.users.findByEmail(email);
    if (!user) {
      // Don't reveal whether the email exists.
      return { message: 'إذا كان البريد مسجلاً سيصلك رمز جديد' };
    }
    const code = await this.otp.generate(email, purpose);
    await this.mail.sendOtpEmail(email, code);
    return { message: 'إذا كان البريد مسجلاً سيصلك رمز جديد' };
  }

  async verifyRegisterOtp(dto: VerifyOtpDto): Promise<TokenPair> {
    const isValid = await this.otp.verify(dto.email, OtpPurpose.REGISTER, dto.code);
    if (!isValid) {
      throw new BadRequestException('رمز التحقق غير صحيح');
    }

    const user = await this.users.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('الحساب غير موجود');
    }

    const verifiedUser = await this.users.markVerified(user.id);
    return this.issueTokenPair(verifiedUser.id, verifiedUser.email);
  }

  // ---------------------------------------------------------------
  // Login (email + password)
  // ---------------------------------------------------------------
  async login(dto: LoginDto): Promise<TokenPair> {
    const user = await this.users.findByEmail(dto.email);

    // Constant-shaped failure path: whether the email doesn't exist or the
    // password is wrong, the caller gets the same generic error.
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const passwordMatches = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    if (user.isBlocked) {
      throw new ForbiddenException('هذا الحساب محظور، تواصل مع الدعم');
    }

    if (!user.isVerified) {
      throw new ForbiddenException('يرجى تفعيل الحساب عبر رمز التحقق المرسل للبريد');
    }

    return this.issueTokenPair(user.id, user.email);
  }

  // ---------------------------------------------------------------
  // Google OAuth — email is already verified by Google, so the account
  // (new or existing) is activated immediately.
  // ---------------------------------------------------------------
  async loginWithGoogle(googleUser: {
    googleId: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
  }): Promise<TokenPair> {
    let user = await this.users.findByGoogleId(googleUser.googleId);

    if (!user) {
      const existingByEmail = await this.users.findByEmail(googleUser.email);
      user = existingByEmail ?? (await this.users.createFromGoogle(googleUser));
    }

    if (user.isBlocked) {
      throw new ForbiddenException('هذا الحساب محظور، تواصل مع الدعم');
    }

    return this.issueTokenPair(user.id, user.email);
  }

  // ---------------------------------------------------------------
  // Refresh token rotation with reuse detection: only the single most
  // recently issued refresh token per user is valid. If an older one is
  // presented, every session for that user is revoked as a precaution.
  // ---------------------------------------------------------------
  async refresh(userId: string, presentedToken: string): Promise<TokenPair> {
    const storedToken = await this.redis.get(this.refreshKey(userId));

    if (!storedToken || storedToken !== presentedToken) {
      await this.redis.del(this.refreshKey(userId));
      throw new UnauthorizedException('انتهت الجلسة، يرجى تسجيل الدخول مجدداً');
    }

    const user = await this.users.findById(userId);
    if (!user || user.isBlocked) {
      throw new UnauthorizedException('الجلسة غير صالحة');
    }

    return this.issueTokenPair(user.id, user.email);
  }

  async logout(userId: string): Promise<void> {
    await this.redis.del(this.refreshKey(userId));
  }

  // ---------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------
  private refreshKey(userId: string): string {
    return `refresh_token:${userId}`;
  }

  private async issueTokenPair(userId: string, email: string): Promise<TokenPair> {
    const payload = { sub: userId, email };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('jwt.accessSecret'),
      expiresIn: this.config.get<string>('jwt.accessExpiresIn'),
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('jwt.refreshSecret'),
      expiresIn: this.config.get<string>('jwt.refreshExpiresIn'),
    });

    // Storing (not just signing) the refresh token is what makes rotation +
    // reuse detection possible — a stolen-but-superseded token becomes useless.
    const refreshTtlSeconds = 7 * 24 * 60 * 60;
    await this.redis.setWithTtl(this.refreshKey(userId), refreshToken, refreshTtlSeconds);

    return { accessToken, refreshToken };
  }
}

import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';
import { RedisService } from '../redis/redis.service';
import { OtpPurpose } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

// OTP codes live in Redis for fast, auto-expiring lookups. A hashed copy is
// also written to Postgres (otp_codes) purely as a durable audit trail —
// the plaintext code is never persisted anywhere.
@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private readonly ttlSeconds: number;
  private readonly maxAttempts: number;

  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.ttlSeconds = this.config.get<number>('otp.ttlSeconds')!;
    this.maxAttempts = this.config.get<number>('otp.maxAttempts')!;
  }

  private redisKey(identifier: string, purpose: OtpPurpose): string {
    return `otp:${purpose}:${identifier}`;
  }

  private attemptsKey(identifier: string, purpose: OtpPurpose): string {
    return `otp_attempts:${purpose}:${identifier}`;
  }

  /** Generates a 6-digit code, stores a hash of it, and returns the plaintext to send by email. */
  async generate(identifier: string, purpose: OtpPurpose): Promise<string> {
    const code = crypto.randomInt(100000, 999999).toString();
    const hash = await argon2.hash(code);

    await this.redis.setWithTtl(this.redisKey(identifier, purpose), hash, this.ttlSeconds);
    await this.redis.del(this.attemptsKey(identifier, purpose));

    await this.prisma.otpCode.create({
      data: {
        identifier,
        codeHash: hash,
        purpose,
        expiresAt: new Date(Date.now() + this.ttlSeconds * 1000),
      },
    });

    return code;
  }

  /** Verifies a submitted code, enforcing a max-attempts lockout to slow down brute force. */
  async verify(identifier: string, purpose: OtpPurpose, submittedCode: string): Promise<boolean> {
    const attemptsKey = this.attemptsKey(identifier, purpose);
    const attempts = await this.redis.incr(attemptsKey, this.ttlSeconds);

    if (attempts > this.maxAttempts) {
      throw new BadRequestException('عدد المحاولات تجاوز الحد المسموح، اطلب رمزاً جديداً');
    }

    const storedHash = await this.redis.get(this.redisKey(identifier, purpose));
    if (!storedHash) {
      throw new BadRequestException('انتهت صلاحية الرمز أو أنه غير موجود، اطلب رمزاً جديداً');
    }

    const isValid = await argon2.verify(storedHash, submittedCode);
    if (isValid) {
      await this.redis.del(this.redisKey(identifier, purpose));
      await this.redis.del(attemptsKey);
    }

    return isValid;
  }
}

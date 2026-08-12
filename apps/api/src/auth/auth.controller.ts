import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

const REFRESH_COOKIE = 'souq_refresh_token';

@Controller('auth')
@UseGuards(ThrottlerGuard) // every route below is additionally rate-limited
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  private setRefreshCookie(res: Response, token: string) {
    res.cookie(REFRESH_COOKIE, token, {
      httpOnly: true,
      secure: this.config.get('env') === 'production',
      sameSite: 'strict',
      path: '/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('register/resend-otp')
  resendRegisterOtp(@Body() dto: ResendOtpDto) {
    return this.authService.resendOtp(dto.email);
  }

  @Public()
  @Post('register/verify-otp')
  async verifyRegisterOtp(@Body() dto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.verifyRegisterOtp(dto);
    this.setRefreshCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto);
    this.setRefreshCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    // Redirect handled entirely by Passport's Google strategy.
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.loginWithGoogle(req.user as any);
    this.setRefreshCookie(res, tokens.refreshToken);

    // Hand the short-lived access token back via a redirect fragment so it
    // never touches server logs or the browser's address-bar history state.
    const frontendUrl = this.config.get<string>('frontendUrl');
    res.redirect(`${frontendUrl}/auth/callback#access_token=${tokens.accessToken}`);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@CurrentUser() user: { userId: string; refreshToken: string }, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refresh(user.userId, user.refreshToken);
    this.setRefreshCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: { userId: string }, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(user.userId);
    res.clearCookie(REFRESH_COOKIE, { path: '/auth' });
    return { message: 'تم تسجيل الخروج' };
  }

  @Get('me')
  me(@CurrentUser() user: { userId: string; email: string }) {
    return user;
  }
}

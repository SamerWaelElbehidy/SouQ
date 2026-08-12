import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OtpModule } from './otp/otp.module';
import { MailModule } from './mail/mail.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),

    // Default rate limit applied everywhere; auth endpoints tighten this
    // further with their own ThrottlerGuard usage.
    ThrottlerModule.forRoot([{ ttl: 60, limit: 60 }]),

    PrismaModule,
    RedisModule,
    UsersModule,
    OtpModule,
    MailModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
  ],
  providers: [
    // Every route requires a valid access token by default —
    // routes opt OUT via @Public(), not the other way around.
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}

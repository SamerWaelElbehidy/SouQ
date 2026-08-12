import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ---- Security headers ----
  app.use(helmet());

  // ---- Cookies (refresh token) ----
  app.use(cookieParser());

  // ---- CORS: only the configured frontend origin, with credentials for cookies ----
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  // ---- Strict input validation on every DTO ----
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip any field not declared in the DTO
      forbidNonWhitelisted: true, // reject the request outright if it tries to sneak extra fields in
      transform: true,
    }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`SouQ API listening on port ${port}`);
}

bootstrap();

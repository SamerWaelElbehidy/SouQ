import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'رمز التحقق يتكون من 6 أرقام' })
  code: string;
}

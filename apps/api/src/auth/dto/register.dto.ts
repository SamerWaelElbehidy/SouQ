import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  fullName: string;

  @IsEmail()
  email: string;

  // At least one letter and one number, 8+ chars — balance between
  // usability and not accepting trivially guessable passwords.
  @IsString()
  @MinLength(8)
  @MaxLength(72) // argon2/bcrypt-safe upper bound
  @Matches(/(?=.*[A-Za-z])(?=.*\d)/, {
    message: 'كلمة المرور يجب أن تحتوي على حرف ورقم على الأقل',
  })
  password: string;
}

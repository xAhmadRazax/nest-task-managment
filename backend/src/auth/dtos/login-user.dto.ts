import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least 1 uppercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least 1 number',
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'Password must contain at least special letter',
  })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).toString())
  email: string;
}

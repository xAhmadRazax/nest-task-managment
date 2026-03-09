import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/[A-Z]/, {
    message: 'Current password must contain at least 1 uppercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Current password must contain at least 1 number',
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'Current password must contain at least special letter',
  })
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/[A-Z]/, {
    message: 'New password must contain at least 1 uppercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'New password must contain at least 1 number',
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'New password must contain at least special letter',
  })
  newPassword: string;
}

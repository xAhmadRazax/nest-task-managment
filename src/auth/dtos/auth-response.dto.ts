import { Expose, Type } from 'class-transformer';
import { PublicUser } from 'src/users/dtos/public-user.dto';

export class AuthResponseDto {
  @Expose()
  @Type(() => PublicUser)
  user: PublicUser;

  @Expose()
  accessToken: string;

  @Expose()
  passwordResetUrl: string;
}

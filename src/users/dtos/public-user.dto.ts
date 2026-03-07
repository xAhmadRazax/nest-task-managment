import { Expose } from 'class-transformer';

export class PublicUser {
  @Expose()
  name: string;

  @Expose()
  email: string;

  //   @Expose()
  //   createdAt: Date;

  //   @Expose()
  //   updatedAt: Date;
}

import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BlacklistTokens {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  token: string;
}

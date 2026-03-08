import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlacklistTokens {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  token: string;
}

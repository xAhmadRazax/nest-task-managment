import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsEmail()
  @Index()
  email: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  password: string;
}

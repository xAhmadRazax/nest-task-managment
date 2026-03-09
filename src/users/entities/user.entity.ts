import { IsEmail, IsString } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @Index()
  email: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  passwordChangedAt: Date;

  @BeforeInsert()
  normalizeEmail() {
    this.email = this.email.toLowerCase();
  }
}

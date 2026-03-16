import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TaskStatus } from '../types/task.type';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;
  // here instead of using default uuid
  //  i decided to use cuid as i have to
  // use id in the path to fetch the children
  // so cuid here will save a lot of space
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  targetDate: Date;

  @Column({ type: 'enum', default: TaskStatus.OPEN, enum: TaskStatus })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column({ nullable: true })
  completedAt?: Date;

  @ManyToOne(() => Task, (task) => task.subTasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: Task;

  @OneToMany(() => Task, (task) => task.parent)
  subTasks: Task[];
}

import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../types/task.type';

export class ChangeTaskStatusDto {
  @IsNotEmpty()
  newStatus: TaskStatus;
}

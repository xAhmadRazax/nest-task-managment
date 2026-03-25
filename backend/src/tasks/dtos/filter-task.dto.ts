import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { TaskStatus } from '../types/task.type';

export class FilterTaskDto extends PaginationDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';
}

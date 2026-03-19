import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSubtaskDto } from './create-subtasks.dto';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @Type(() => CreateSubtaskDto)
  @ValidateNested({ each: true })
  subTasks?: CreateSubtaskDto[];
}

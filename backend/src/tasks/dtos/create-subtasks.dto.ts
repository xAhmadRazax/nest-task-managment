import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsDate()
  targetDate: Date;
}

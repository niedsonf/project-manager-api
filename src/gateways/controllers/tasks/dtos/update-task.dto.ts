import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDTO } from './create-task.dto';
import { IsNumber } from 'class-validator';

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {
  @IsNumber()
  id: number;
}

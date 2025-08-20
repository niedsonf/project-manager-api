import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty({ message: 'O nome da tarefa precisa ser definido' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O status da tarefa precisa ser definido' })
  @IsString()
  status: 'pending' | 'completed';

  @IsNumber()
  projectId: number;
}

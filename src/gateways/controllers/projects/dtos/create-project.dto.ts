import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsNotEmpty({ message: 'O nome do projeto precisa ser definido' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A descrição do projeto precisa ser definida' })
  @IsString()
  description: string;
}

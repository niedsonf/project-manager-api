import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'O email deve ser definido' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'A senha deve ser definida' })
  @IsString()
  password: string;
}

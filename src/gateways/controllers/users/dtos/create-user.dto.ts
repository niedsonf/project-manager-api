import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome do usuário precisa ser definido' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'O nome do usuário precisa ser definido' })
  @IsString()
  lastName?: string;

  @IsNotEmpty({ message: 'O email do usuário precisa ser definido' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'A senha do usuário precisa ser definida' })
  @IsString()
  //   @IsStrongPassword()
  password: string;
}

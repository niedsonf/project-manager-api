import { Injectable } from '@nestjs/common';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCase } from '../base-use-case';
import { CreateUserDTO } from 'src/gateways/controllers/users/dtos/create-user.dto';
import { IUser } from 'src/domain/interfaces/user.interface';

@Injectable()
export class CreateUserService implements BaseUseCase {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  async execute(user: CreateUserDTO): Promise<IUser> {
    const createdUser = await this.usersRepository.add(user);

    if (!createdUser) {
      throw new Error('Falha na criação de usuário');
    }

    return createdUser;
  }
}

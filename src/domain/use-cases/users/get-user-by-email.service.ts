import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { IUser } from 'src/domain/interfaces/user.interface';

@Injectable()
export class GetUserByEmailService implements BaseUseCase {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  execute(email: string): Promise<IUser> {
    return this.usersRepository.findByEmail(email);
  }
}

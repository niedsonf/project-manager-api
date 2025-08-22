import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ITask } from 'src/domain/interfaces/task.interface';

@Injectable()
export class GetAllTasksService implements BaseUseCase {
  constructor(
    private readonly tasksRepository: TasksRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: { userId: number }): Promise<ITask[]> {
    const { userId } = payload;

    const userData = await this.usersRepository.findById(userId);

    const tasks = await this.tasksRepository.findAll(userData.id);

    return tasks;
  }
}

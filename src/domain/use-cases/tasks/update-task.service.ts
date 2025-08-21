import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { UpdateTaskDTO } from 'src/gateways/controllers/tasks/dtos/update-task.dto';
import { ITask } from 'src/domain/interfaces/task.interface';

@Injectable()
export class UpdateTaskService implements BaseUseCase {
  constructor(
    private readonly tasksRepository: TasksRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: {
    task: UpdateTaskDTO;
    userId: number;
  }): Promise<ITask> {
    const { task, userId } = payload;

    const userData = await this.usersRepository.findById(userId);

    await this.tasksRepository.updateById(userData.id, task);
    return await this.tasksRepository.findById(userData.id, task.id);
  }
}

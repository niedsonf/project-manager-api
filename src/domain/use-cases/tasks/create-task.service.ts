import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { CreateTaskDTO } from 'src/gateways/controllers/tasks/dtos/create-task.dto';
import { ITask } from 'src/domain/interfaces/task.interface';

@Injectable()
export class CreateTaskService implements BaseUseCase {
  constructor(
    private readonly tasksRepository: TasksRepositoryService,
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: {
    task: CreateTaskDTO;
    userId: number;
  }): Promise<ITask> {
    const { task, userId } = payload;

    const userData = await this.usersRepository.findById(userId);

    const projectData = await this.projectsRepository.findById(
      userData.id,
      task.projectId,
    );

    const createdTask = await this.tasksRepository.add({
      name: task.name,
      status: task.status,
      project: { id: projectData.id },
      user: { id: userData.id },
    });

    if (!createdTask) {
      throw new Error('Erro ao criar tarefa');
    }

    return createdTask;
  }
}

import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { IProject } from 'src/domain/interfaces/project.interface';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetProjectByIdService implements BaseUseCase {
  constructor(
    private readonly projectsRepository: ProjectsRepositoryService,
    private readonly usersRepository: UsersRepositoryService,
  ) {}

  async execute(payload: {
    projectId: number;
    userId: number;
  }): Promise<IProject> {
    const userData = await this.usersRepository.findById(payload.userId);

    const project = await this.projectsRepository.findById(
      userData.id,
      payload.projectId,
    );

    return project;
  }
}

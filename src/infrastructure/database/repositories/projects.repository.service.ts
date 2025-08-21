import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { IProjectsRepository } from 'src/domain/repositories/projects-repository.interface';
import { IProject } from 'src/domain/interfaces/project.interface';

@Injectable()
export class ProjectsRepositoryService
  extends Repository<ProjectEntity>
  implements IProjectsRepository
{
  constructor(dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  findAll(userId: number): Promise<IProject[]> {
    return this.findBy({ user: { id: userId } });
  }

  findById(userId: number, id: number): Promise<IProject> {
    return this.findOneByOrFail({ id, user: { id: userId } });
  }

  add(payload: DeepPartial<IProject>) {
    return this.save(payload);
  }
}

import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { ITasksRepository } from 'src/domain/repositories/tasks-repository.interface';
import { ITask } from 'src/domain/interfaces/task.interface';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class TasksRepositoryService
  extends Repository<TaskEntity>
  implements ITasksRepository
{
  constructor(dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  findAll(userId: number): Promise<ITask[]> {
    return this.findBy({ user: { id: userId } });
  }
  findById(userId: number, id: number): Promise<ITask> {
    return this.findOneByOrFail({ id, user: { id: userId } });
  }
  add(payload: DeepPartial<ITask>): Promise<ITask> {
    return this.save(payload);
  }
  updateById(id: number, payload: DeepPartial<ITask>) {
    return this.update(id, payload);
  }
}

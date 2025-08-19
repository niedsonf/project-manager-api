import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ProjectsController } from './projects/projects.controller';
import { TasksController } from './tasks/tasks.controller';

@Module({
  controllers: [ProjectsController, TasksController, UsersController],
})
export class ControllersModule {}

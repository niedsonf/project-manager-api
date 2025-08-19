import { Module } from '@nestjs/common';
import { UsersRepositoryService } from './repositories/users.repository.service';
import { TasksRepositoryService } from './repositories/tasks.repository.service';
import { ProjectsRepositoryService } from './repositories/projects.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [
    ProjectsRepositoryService,
    TasksRepositoryService,
    UsersRepositoryService,
  ],
  exports: [
    ProjectsRepositoryService,
    TasksRepositoryService,
    UsersRepositoryService,
  ],
})
export class DatabaseModule {}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service';
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { jwtSchema } from 'src/infrastructure/auth/constants';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly getAllTasksUseCase: GetAllTasksService,
    private readonly getTaskByIdUseCase: GetTaskByIdService,
    private readonly createTaskUseCase: CreateTaskService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async findAll(@Req() request) {
    try {
      const tasksCache = await this.cacheManager.get('tasks');
      if (tasksCache) {
        return tasksCache;
      }

      const loggedUser = request.user as jwtSchema;
      const tasks = await this.getAllTasksUseCase.execute({
        userId: loggedUser.sub,
      });
      await this.cacheManager.set('tasks', tasks);
      return tasks;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id')
  findById(@Req() request, @Param('id') taskId: number) {
    try {
      const loggedUser = request.user as jwtSchema;
      return this.getTaskByIdUseCase.execute({
        taskId,
        userId: loggedUser.sub,
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  create(@Req() request, @Body() createTaskDTO: CreateTaskDTO) {
    try {
      const loggedUser = request.user as jwtSchema;
      return this.createTaskUseCase.execute({
        task: createTaskDTO,
        userId: loggedUser.sub,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}

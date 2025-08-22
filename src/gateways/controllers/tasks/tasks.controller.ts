import {
  Body,
  Controller,
  Get,
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

const loggedUser = 1;

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly getAllTasksUseCase: GetAllTasksService,
    private readonly getTaskByIdUseCase: GetTaskByIdService,
    private readonly createTaskUseCase: CreateTaskService,
  ) {}

  @Get()
  findAll() {
    try {
      return this.getAllTasksUseCase.execute({ userId: loggedUser });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id')
  findById(@Req() request, @Param('id') taskId: number) {
    try {
      return this.getTaskByIdUseCase.execute({ taskId, userId: loggedUser });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  create(@Req() request, @Body() createTaskDTO: CreateTaskDTO) {
    try {
      return this.createTaskUseCase.execute({
        task: createTaskDTO,
        userId: loggedUser,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}

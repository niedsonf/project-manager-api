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
import { CreateProjectDTO } from './dtos/create-project.dto';
import { CreateProjectService } from 'src/domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from 'src/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from 'src/domain/use-cases/projects/get-project-by-id.service';
import { IProject } from 'src/domain/interfaces/project.interface';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectService,
    private readonly getAllProjectsUseCase: GetAllProjectsService,
    private readonly getProjectByIdUseCase: GetProjectByIdService,
  ) {}

  @Get()
  findAll(@Req() request): Promise<IProject[]> {
    try {
      const loggedUser = request.user;
      return this.getAllProjectsUseCase.execute(loggedUser.sub);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id')
  find(@Req() request, @Param('id') id: number): Promise<IProject> {
    try {
      const loggedUser = request.user;
      return this.getProjectByIdUseCase.execute({
        projectId: id,
        userId: loggedUser.sub,
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  create(@Req() request, @Body() createProjectDTO: CreateProjectDTO) {
    try {
      const loggedUser = request.user;
      return this.createProjectUseCase.execute({
        project: createProjectDTO,
        userId: loggedUser.sub,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}

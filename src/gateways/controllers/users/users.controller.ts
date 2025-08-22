import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserService } from 'src/domain/use-cases/users/create-user.service';
import { GetUserByIdService } from 'src/domain/use-cases/users/get-user-by-id.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Public } from 'src/gateways/guards/auth-guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdService,
    private readonly createUserUseCase: CreateUserService,
  ) {}

  @Get(':id')
  find(@Param('id') id: number) {
    try {
      return this.getUserByIdUseCase.execute(id);
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  @Post()
  @Public()
  create(@Body() createUserDTO: CreateUserDTO) {
    try {
      return this.createUserUseCase.execute(createUserDTO);
    } catch (error) {
      return new UnprocessableEntityException(error);
    }
  }
}

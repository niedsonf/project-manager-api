import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/infrastructure/auth/auth.service';
import { LoginDTO } from './dtos/login.dto';
import { Public } from 'src/gateways/guards/auth-guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.email, loginDTO.password);
  }
}

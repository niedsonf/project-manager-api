import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { GetUserByEmailService } from 'src/domain/use-cases/users/get-user-by-email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.getUserByEmailUseCase.execute(email);

    const isAValidUser = await compare(password, user.password);
    if (!isAValidUser) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

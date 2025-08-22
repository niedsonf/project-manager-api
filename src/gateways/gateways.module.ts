import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { AuthGuard } from './guards/auth-guard/auth.guard';

@Module({
  imports: [ControllersModule],
  providers: [AuthGuard],
  // exports: [AuthGuard],
})
export class GatewaysModule {}

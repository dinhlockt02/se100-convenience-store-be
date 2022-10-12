import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../common/strategies/local.strategy';
import { UseCasesProxyModule } from '../usecase-proxies/usecase-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [UseCasesProxyModule.register(), PassportModule],
  controllers: [UserController, AuthController],
  providers: [LocalStrategy],
})
export class ControllersModule {}

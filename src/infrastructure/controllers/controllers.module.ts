import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthUsecasesModule } from 'src/usecases/auth/auth.usecases.module';
import { UserUsecasesModule } from 'src/usecases/users/users.usecase.module';
import { LocalStrategy } from '../common/strategies/local.strategy';
import { AuthController } from './auth/auth.controller';
import { ImageController } from './image/image.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [PassportModule, AuthUsecasesModule, UserUsecasesModule],
  controllers: [UserController, AuthController, ImageController],
  providers: [LocalStrategy],
})
export class ControllersModule {}

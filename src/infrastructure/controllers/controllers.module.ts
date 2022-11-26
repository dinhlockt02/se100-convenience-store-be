import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthUsecasesModule } from 'src/usecases/auth/auth.usecases.module';
import { ProviderUsecasesModule } from 'src/usecases/provider/provider.usecases.module';
import { UserUsecasesModule } from 'src/usecases/user/user.usecases.module';
import { LocalStrategy } from '../common/strategies/local.strategy';
import { AuthController } from './auth/auth.controller';
import { ImageController } from './image/image.controller';
import { ProviderController } from './provider/provider.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    PassportModule,
    AuthUsecasesModule,
    UserUsecasesModule,
    ProviderUsecasesModule,
  ],
  controllers: [
    UserController,
    AuthController,
    ImageController,
    ProviderController,
  ],
  providers: [LocalStrategy],
})
export class ControllersModule {}

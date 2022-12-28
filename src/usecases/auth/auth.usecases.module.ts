import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { ForgotPasswordUsecase } from './forgot-password.usecase';
import { LoginUsecase } from './login.usecase';
import { ResetPasswordUsecase } from './reset-password.usecase';

@Module({
  imports: [ServicesModule, RepositoriesModule],
  providers: [ForgotPasswordUsecase, LoginUsecase, ResetPasswordUsecase],
  exports: [ForgotPasswordUsecase, LoginUsecase, ResetPasswordUsecase],
})
export class AuthUsecasesModule {}

import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { ResetPasswordTokenRepository } from './prisma/reset-password-token.repository';
import { UserRepository } from './prisma/user.repository';

@Module({
  imports: [ServicesModule, ServicesModule],
  providers: [UserRepository, ResetPasswordTokenRepository],
  exports: [UserRepository, ResetPasswordTokenRepository],
})
export class RepositoriesModule {}

import { Module } from '@nestjs/common';
import { IResetPasswordTokenRepositoryLabel } from 'src/core/repositories/reset-password-token.repository.interface';
import { IUserRepositoryLabel } from 'src/core/repositories/user.repository.interface';
import { ServicesModule } from '../services/services.module';
import { ResetPasswordTokenRepository } from './prisma/reset-password-token.repository';
import { UserRepository } from './prisma/user.repository';

@Module({
  imports: [ServicesModule],
  providers: [
    {
      provide: IUserRepositoryLabel,
      useClass: UserRepository,
    },
    {
      provide: IResetPasswordTokenRepositoryLabel,
      useClass: ResetPasswordTokenRepository,
    },
  ],
  exports: [
    {
      provide: IUserRepositoryLabel,
      useClass: UserRepository,
    },
    {
      provide: IResetPasswordTokenRepositoryLabel,
      useClass: ResetPasswordTokenRepository,
    },
  ],
})
export class RepositoriesModule {}

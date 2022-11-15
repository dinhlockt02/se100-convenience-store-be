import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { ProductRepository } from './prisma/product.repository';
import { ResetPasswordTokenRepository } from './prisma/reset-password-token.repository';
import { UserRepository } from './prisma/user.repository';

@Module({
  imports: [ServicesModule, ServicesModule],
  providers: [UserRepository, ResetPasswordTokenRepository, ProductRepository],
  exports: [UserRepository, ResetPasswordTokenRepository, ProductRepository],
})
export class RepositoriesModule {}

import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { UserRepository } from './prisma/user.repository';

@Module({
  imports: [ServicesModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {}

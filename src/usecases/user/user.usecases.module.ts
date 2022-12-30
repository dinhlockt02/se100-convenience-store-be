import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { ChangePasswordUseCase } from './change-password.usecase';
import { CreateUserUseCase } from './create-user.usecase';
import { DeleteUserByIdUsecase } from './delete-user-by-id.usecase';
import { GetUserByIdUsecase } from './get-users-by-id.usecase';
import { GetUsersUsecase } from './get-users.usecase';
import { UpdateUserUseCase } from './update-user.usecase';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    CreateUserUseCase,
    DeleteUserByIdUsecase,
    GetUserByIdUsecase,
    GetUsersUsecase,
    UpdateUserUseCase,
    ChangePasswordUseCase,
  ],
  exports: [
    CreateUserUseCase,
    DeleteUserByIdUsecase,
    GetUserByIdUsecase,
    GetUsersUsecase,
    UpdateUserUseCase,
    ChangePasswordUseCase,
  ],
})
export class UserUsecasesModule {}

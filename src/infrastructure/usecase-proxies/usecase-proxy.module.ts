import { DynamicModule, Module } from '@nestjs/common';
import { LoginUsecase } from 'src/usecases/auth/login.usecase';
import { CreateUserUseCase } from 'src/usecases/users/create-user.usecase';
import { UserRepository } from '../repositories/prisma/user.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { BcryptPasswordHasherService } from '../services/bcrypt.password-hasher.service';
import { JwtAuthTokenService } from '../services/jwt.auth-token.service';
import { ServicesModule } from '../services/services.module';
import { UseCaseProxy } from './usecase-proxy';

@Module({
  imports: [RepositoriesModule, ServicesModule],
})
export class UseCasesProxyModule {
  static POST_CREATE_USER_PROXY = 'postCreateUserProxy';
  static LOGIN_USECASE_PROXY = 'loginUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        // Auth
        {
          inject: [
            UserRepository,
            BcryptPasswordHasherService,
            JwtAuthTokenService,
          ],
          provide: UseCasesProxyModule.LOGIN_USECASE_PROXY,
          useFactory: (
            userRepository: UserRepository,
            bcryptPasswordHasherService: BcryptPasswordHasherService,
            jwtAuthTokenService: JwtAuthTokenService,
          ) =>
            new UseCaseProxy(
              new LoginUsecase(
                userRepository,
                bcryptPasswordHasherService,
                jwtAuthTokenService,
              ),
            ),
        },
        //User
        {
          inject: [UserRepository, BcryptPasswordHasherService],
          provide: UseCasesProxyModule.POST_CREATE_USER_PROXY,
          useFactory: (
            userRepository: UserRepository,
            bcryptPasswordHasherService: BcryptPasswordHasherService,
          ) =>
            new UseCaseProxy(
              new CreateUserUseCase(
                userRepository,
                bcryptPasswordHasherService,
              ),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.POST_CREATE_USER_PROXY,
        UseCasesProxyModule.LOGIN_USECASE_PROXY,
      ],
    };
  }
}

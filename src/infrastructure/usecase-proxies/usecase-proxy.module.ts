import { DynamicModule, Module } from '@nestjs/common';
import { ForgotPasswordUsecase } from 'src/usecases/auth/forgot-password.usecase';
import { LoginUsecase } from 'src/usecases/auth/login.usecase';
import { CreateProductUsecase } from 'src/usecases/product/create-product.usecase';
import { DeleteProductByIdUsecase } from 'src/usecases/product/delete-product-by-id.usecase';
import { GetProductbyIdUsecase } from 'src/usecases/product/get-product-by-id.usecase';
import { GetProductsUsecase } from 'src/usecases/product/get-products.usecase';
import { UpdateProductUsecase } from 'src/usecases/product/update-product.usecase';
import { CreateUserUseCase } from 'src/usecases/users/create-user.usecase';
import { DeleteUserByIdUsecase } from 'src/usecases/users/delete-user-by-id.usecase';
import { GetUserByIdUsecase } from 'src/usecases/users/get-users-by-id.usecase';
import { GetUsersUsecase } from 'src/usecases/users/get-users.usecase';
import { UpdateUserUseCase } from 'src/usecases/users/update-user.usecase';
import { ProductRepository } from '../repositories/prisma/product.repository';
import { ResetPasswordTokenRepository } from '../repositories/prisma/reset-password-token.repository';
import { UserRepository } from '../repositories/prisma/user.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { BcryptPasswordHasherService } from '../services/bcrypt.password-hasher.service';
import { JwtAuthTokenService } from '../services/jwt.auth-token.service';
import { SendEmailService } from '../services/send-email.service';
import { ServicesModule } from '../services/services.module';
import { UseCaseProxy } from './usecase-proxy';

@Module({
  imports: [RepositoriesModule, ServicesModule],
})
export class UseCasesProxyModule {
  static POST_CREATE_USER_PROXY = 'postCreateUserProxy';
  static LOGIN_USECASE_PROXY = 'loginUsecaseProxy';
  static FORGOT_PASSWORD_USECASE_PROXY = 'forgotPasswordUsecaseProxy';

  static GET_USERS_USECASE_PROXY = 'getUsersUsecaseProxy';
  static GET_USER_BY_ID_PROXY = 'getUserByIdProxy';
  static DELETE_USER_BY_ID_PROXY = 'deleteUserByIdProxy';
  static UPDATE_USER_PROXY = 'updateUserProxy';

  static CREATE_PRODUCT_USECASE_PROXY = 'createProductUsecaseProxy';
  static GET_PRODUCT_BY_ID_USECASE_PROXY = 'getProductByIsUsecaseProxy';
  static GET_PRODUCTS_USECASE_PROXY = 'getProductsUsecaseProxy';
  static DELETE_PRODUCT_BY_ID_USECASE_PROXY = 'deleteProductByIdUsecaseProxy';
  static UPDATE_PRODUCT_USECASE_PROXY = 'updateProductUsecaseProxy';

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
        {
          inject: [
            UserRepository,
            ResetPasswordTokenRepository,
            SendEmailService,
          ],
          provide: UseCasesProxyModule.FORGOT_PASSWORD_USECASE_PROXY,
          useFactory: (
            userRepository: UserRepository,
            resetPasswordTokenRepository: ResetPasswordTokenRepository,
            sendEmailService: SendEmailService,
          ) =>
            new UseCaseProxy(
              new ForgotPasswordUsecase(
                userRepository,
                sendEmailService,
                resetPasswordTokenRepository,
              ),
            ),
        },
        {
          inject: [UserRepository],
          provide: UseCasesProxyModule.GET_USERS_USECASE_PROXY,
          useFactory: (userRepository: UserRepository) =>
            new UseCaseProxy(new GetUsersUsecase(userRepository)),
        },
        {
          inject: [UserRepository],
          provide: UseCasesProxyModule.GET_USER_BY_ID_PROXY,
          useFactory: (userRepository: UserRepository) =>
            new UseCaseProxy(new GetUserByIdUsecase(userRepository)),
        },
        {
          inject: [UserRepository],
          provide: UseCasesProxyModule.DELETE_USER_BY_ID_PROXY,
          useFactory: (userRepository: UserRepository) =>
            new UseCaseProxy(new DeleteUserByIdUsecase(userRepository)),
        },
        {
          inject: [UserRepository],
          provide: UseCasesProxyModule.UPDATE_USER_PROXY,
          useFactory: (userRepository: UserRepository) =>
            new UseCaseProxy(new UpdateUserUseCase(userRepository)),
        },
        {
          inject: [ProductRepository],
          provide: UseCasesProxyModule.GET_PRODUCT_BY_ID_USECASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new GetProductbyIdUsecase(productRepository)),
        },
        {
          inject: [ProductRepository],
          provide: UseCasesProxyModule.GET_PRODUCTS_USECASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new GetProductsUsecase(productRepository)),
        },
        {
          inject: [ProductRepository],
          provide: UseCasesProxyModule.UPDATE_PRODUCT_USECASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new UpdateProductUsecase(productRepository)),
        },
        {
          inject: [ProductRepository],
          provide: UseCasesProxyModule.DELETE_PRODUCT_BY_ID_USECASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new DeleteProductByIdUsecase(productRepository)),
        },
        {
          inject: [ProductRepository],
          provide: UseCasesProxyModule.CREATE_PRODUCT_USECASE_PROXY,
          useFactory: (productRepository: ProductRepository) =>
            new UseCaseProxy(new CreateProductUsecase(productRepository)),
        },
      ],
      exports: [
        UseCasesProxyModule.POST_CREATE_USER_PROXY,
        UseCasesProxyModule.LOGIN_USECASE_PROXY,
        UseCasesProxyModule.FORGOT_PASSWORD_USECASE_PROXY,
        UseCasesProxyModule.GET_USERS_USECASE_PROXY,
        UseCasesProxyModule.GET_USER_BY_ID_PROXY,
        UseCasesProxyModule.DELETE_USER_BY_ID_PROXY,
        UseCasesProxyModule.UPDATE_USER_PROXY,
        UseCasesProxyModule.CREATE_PRODUCT_USECASE_PROXY,
        UseCasesProxyModule.GET_PRODUCT_BY_ID_USECASE_PROXY,
        UseCasesProxyModule.GET_PRODUCTS_USECASE_PROXY,
        UseCasesProxyModule.DELETE_PRODUCT_BY_ID_USECASE_PROXY,
        UseCasesProxyModule.UPDATE_PRODUCT_USECASE_PROXY,
      ],
    };
  }
}

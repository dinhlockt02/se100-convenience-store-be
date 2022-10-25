import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/core/entities/user.entity';
import * as BussinessException from 'src/core/exceptions/bussiness.exception';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxies/usecase-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecase-proxies/usecase-proxy.module';
import { CreateUserUseCase } from 'src/usecases/users/create-user.usecase';
import { GetUsersUsecase as GetUsersUseCase } from 'src/usecases/users/get-users.usecase';
import { CreateUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.POST_CREATE_USER_PROXY)
    private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>,
    @Inject(UseCasesProxyModule.GET_USERS_USECASE_PROXY)
    private readonly getUsersUseCase: UseCaseProxy<GetUsersUseCase>,
  ) {}

  @Get()
  async getUsers() {
    try {
      const userEnitities = await this.getUsersUseCase.getInstance().execute();
      return userEnitities.map((entity) => new UserPresenter(entity));
    } catch (error) {
      this.catchError(error);
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUserEntity = this.toEntity(createUserDto);
      const userEntity = await this.createUserUseCase
        .getInstance()
        .execute(newUserEntity);
      return new UserPresenter(userEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  toEntity(createUserDto: CreateUserDto): UserEntity {
    const newUserEntity = new UserEntity();
    newUserEntity.email = createUserDto.email;
    newUserEntity.password = createUserDto.password;
    newUserEntity.fullname = createUserDto.fullname;
    return newUserEntity;
  }

  catchError(exception: BussinessException.BussinessException) {
    if (exception instanceof BussinessException.ConflictException) {
      throw new ConflictException(exception.message);
    }
    if (exception instanceof BussinessException.ValidationException) {
      throw new BadRequestException(exception.errors);
    }
    throw new InternalServerErrorException(exception.message);
  }
}

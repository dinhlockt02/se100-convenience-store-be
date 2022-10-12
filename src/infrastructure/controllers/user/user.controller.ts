import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
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
import { CreateUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.POST_CREATE_USER_PROXY)
    private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>,
  ) {}

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

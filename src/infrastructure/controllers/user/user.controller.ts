import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as BussinessException from 'src/core/exceptions/bussiness.exception';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxies/usecase-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecase-proxies/usecase-proxy.module';
import { CreateUserUseCase } from 'src/usecases/users/create-user.usecase';
import { DeleteUserByIdUsecase as DeleteUserUsecase } from 'src/usecases/users/delete-user-by-id.usecase';
import { GetUserByIdUsecase } from 'src/usecases/users/get-users-by-id.usecase';
import { GetUsersUsecase as GetUsersUseCase } from 'src/usecases/users/get-users.usecase';
import { UpdateUserUseCase } from 'src/usecases/users/update-user.usecase';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.POST_CREATE_USER_PROXY)
    private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>,
    @Inject(UseCasesProxyModule.GET_USERS_USECASE_PROXY)
    private readonly getUsersUseCase: UseCaseProxy<GetUsersUseCase>,
    @Inject(UseCasesProxyModule.GET_USER_BY_ID_PROXY)
    private readonly getUserByIdUseCase: UseCaseProxy<GetUserByIdUsecase>,
    @Inject(UseCasesProxyModule.DELETE_USER_BY_ID_PROXY)
    private readonly deleteUserUseCase: UseCaseProxy<DeleteUserUsecase>,
    @Inject(UseCasesProxyModule.UPDATE_USER_PROXY)
    private readonly updateUserUseCase: UseCaseProxy<UpdateUserUseCase>,
  ) {}

  private readonly logger = new Logger(UserController.name);

  @Get()
  @ApiOkResponse({
    type: UserPresenter,
    isArray: true,
  })
  async getUsers() {
    try {
      const userEnitities = await this.getUsersUseCase.getInstance().execute();
      return userEnitities.map((entity) => new UserPresenter(entity));
    } catch (error) {
      this.catchError(error);
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const userEntity = await this.getUserByIdUseCase
        .getInstance()
        .execute(id);
      return new UserPresenter(userEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUserEntity = CreateUserDto.toEntity(createUserDto);
      const userEntity = await this.createUserUseCase
        .getInstance()
        .execute(newUserEntity);
      return new UserPresenter(userEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    try {
      const newUserEntity = UpdateUserDto.toEntity(updateUserDto);
      Logger.log(this.updateUserUseCase);
      const userEntity = await this.updateUserUseCase
        .getInstance()
        .execute(newUserEntity);
      return new UserPresenter(userEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deleteUserUseCase.getInstance().execute(id);
    } catch (error) {
      this.catchError(error);
    }
  }

  catchError(exception: BussinessException.BussinessException) {
    if (exception instanceof BussinessException.ConflictException) {
      throw new ConflictException(exception.message);
    }
    if (exception instanceof BussinessException.ValidationException) {
      throw new BadRequestException(exception.errors);
    }
    if (exception instanceof BussinessException.NotFoundException) {
      throw new NotFoundException(exception.message);
    }
    throw new InternalServerErrorException(exception.message);
  }
}

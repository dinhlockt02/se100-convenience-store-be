import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreException } from 'src/core/exceptions';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseInternalServerOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { CreateUserUseCase } from 'src/usecases/users/create-user.usecase';
import { DeleteUserByIdUsecase as DeleteUserUsecase } from 'src/usecases/users/delete-user-by-id.usecase';
import { GetUserByIdUsecase } from 'src/usecases/users/get-users-by-id.usecase';
import { GetUsersUsecase as GetUsersUseCase } from 'src/usecases/users/get-users.usecase';
import { UpdateUserUseCase } from 'src/usecases/users/update-user.usecase';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('users')
@ApiTags('users')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUsecase,
    private readonly deleteUserUseCase: DeleteUserUsecase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  private readonly logger = new Logger(UserController.name);

  @Get()
  @ApiOkResponse({
    type: UserPresenter,
    isArray: true,
  })
  async getUsers() {
    try {
      const userEnitities = await this.getUsersUseCase.execute();
      return userEnitities.map((entity) => new UserPresenter(entity));
    } catch (error) {
      this.catchError(error);
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const userEntity = await this.getUserByIdUseCase.execute(id);
      return new UserPresenter(userEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUserEntity = CreateUserDto.toEntity(createUserDto);
      const userEntity = await this.createUserUseCase.execute(newUserEntity);
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
      const userEntity = await this.updateUserUseCase.execute(newUserEntity);
      return new UserPresenter(userEntity);
    } catch (error) {
      this.catchError(error);
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deleteUserUseCase.execute(id);
    } catch (error) {
      this.catchError(error);
    }
  }

  catchError(error: Error) {
    if (error instanceof CoreException.BussinessException) {
      HandleExeption(error);
    }
    throw new InternalServerErrorException(error);
  }
}

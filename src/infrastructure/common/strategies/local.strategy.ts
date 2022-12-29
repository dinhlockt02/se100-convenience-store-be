import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUsecase } from 'src/usecases/auth/login.usecase';
import { CoreException } from 'src/core/exceptions';
import { HandleExeption } from '../exception/handler';
import { UserEntity } from 'src/core/entities/user.entity';
import { UserPresenter } from 'src/infrastructure/controllers/user/user.presenter';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginUsecase: LoginUsecase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    user: UserPresenter;
  }> {
    if (!email || !password) {
      throw new BadRequestException('Invalid email or password');
    }
    try {
      const { token, user } = await this.loginUsecase.execute(email, password);
      if (!user || !user.active) {
        throw new BadRequestException('User not exist');
      }
      return {
        access_token: token,
        user: new UserPresenter(user),
      };
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

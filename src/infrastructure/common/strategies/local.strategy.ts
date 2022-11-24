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

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginUsecaseProxy: LoginUsecase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new BadRequestException('Invalid email or password');
    }
    try {
      const token = await this.loginUsecaseProxy.execute(email, password);

      return {
        access_token: token,
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

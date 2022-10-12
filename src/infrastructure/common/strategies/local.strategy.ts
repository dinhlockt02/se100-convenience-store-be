import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxies/usecase-proxy';
import { LoginUsecase } from 'src/usecases/auth/login.usecase';
import { UseCasesProxyModule } from 'src/infrastructure/usecase-proxies/usecase-proxy.module';
import * as BussinessException from 'src/core/exceptions';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UseCasesProxyModule.LOGIN_USECASE_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUsecase>,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new BadRequestException('Invalid email or password');
    }
    try {
      const token = await this.loginUsecaseProxy
        .getInstance()
        .execute(email, password);

      return {
        access_token: token,
      };
    } catch (error) {
      this.catchError(error);
    }
  }

  catchError(error: BussinessException.BussinessException) {
    if (error instanceof BussinessException.NotFoundException) {
      throw new NotFoundException('Email has not been registered');
    }
    if (error instanceof UnauthorizedException) {
      throw new UnauthorizedException(error.message);
    }
    throw new InternalServerErrorException(error.message);
  }
}

import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Inject,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infrastructure/common/guards/local.auth-guard';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxies/usecase-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecase-proxies/usecase-proxy.module';
import { ForgotPasswordUsecase } from 'src/usecases/auth/forgot-password.usecase';
import { AuthLoginDto, ForgotPasswordDto } from './auth.dto';
import * as BussinessException from 'src/core/exceptions';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.FORGOT_PASSWORD_USECASE_PROXY)
    private readonly forgotPasswordUsecase: UseCaseProxy<ForgotPasswordUsecase>,
  ) {}

  // @Login API
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
        },
      },
    },
  })
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
  // Forgot password API
  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      const token = await this.forgotPasswordUsecase
        .getInstance()
        .execute(forgotPasswordDto.email);
      return token;
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
    if (exception instanceof BussinessException.AuthException) {
      throw new UnauthorizedException(exception.message);
    }
    throw new InternalServerErrorException(exception.message);
  }
}

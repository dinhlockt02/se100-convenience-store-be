import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { error } from 'console';
import { CoreException } from 'src/core/exceptions';
import {
  apiResponseBadRequestOptions,
  apiResponseConflictOptions,
  apiResponseInternalServerOptions,
  apiResponseNotFoundOptions,
  apiResponseUnauthorizedOptions,
  HandleExeption,
} from 'src/infrastructure/common/exception/handler';
import { LocalAuthGuard } from 'src/infrastructure/common/guards/local.auth-guard';
import { ForgotPasswordUsecase } from 'src/usecases/auth/forgot-password.usecase';
import { ResetPasswordUsecase } from 'src/usecases/auth/reset-password.usecase';
import { UserPresenter } from '../user/user.presenter';
import { AuthLoginDto, ForgotPasswordDto, ResetPasswordDto } from './auth.dto';
import { AuthPresenter } from './auth.presenter';

@Controller('auth')
@ApiTags('auth')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class AuthController {
  constructor(
    private readonly forgotPasswordUsecase: ForgotPasswordUsecase,
    private readonly resetPasswordUsecase: ResetPasswordUsecase,
  ) {}

  // @Login API
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({
    status: 200,
    type: AuthPresenter,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return req.user;
  }
  // Forgot password API
  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      const token = await this.forgotPasswordUsecase.execute(
        forgotPasswordDto.email,
      );
      return token;
    } catch (error) {
      HandleExeption(error);
    }
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      await this.resetPasswordUsecase.execute(
        resetPasswordDto.password,
        resetPasswordDto.token,
      );
      return {
        message: 'Update successful',
      };
    } catch (error) {
      HandleExeption(error);
    }
  }
}

import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  InternalServerErrorException,
  HttpCode,
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
import { AuthLoginDto, ForgotPasswordDto } from './auth.dto';

@Controller('auth')
@ApiTags('auth')
@ApiResponse(apiResponseBadRequestOptions)
@ApiResponse(apiResponseConflictOptions)
@ApiResponse(apiResponseNotFoundOptions)
@ApiResponse(apiResponseUnauthorizedOptions)
@ApiResponse(apiResponseInternalServerOptions)
export class AuthController {
  constructor(private readonly forgotPasswordUsecase: ForgotPasswordUsecase) {}

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
      const token = await this.forgotPasswordUsecase.execute(
        forgotPasswordDto.email,
      );
      return token;
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

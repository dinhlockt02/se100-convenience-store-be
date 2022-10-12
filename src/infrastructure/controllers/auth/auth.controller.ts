import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infrastructure/common/guards/local.auth-guard';
import { AuthLoginDto } from './auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
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
}

import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UseGuards,
  Request,
  ConflictException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BcryptService } from 'src/auth/bcrypt.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import CreateUserDto from './dto/create-user.dto';
import { UserService as UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
  ) {}

  private readonly logger = new Logger(UsersController.name);

  @Get()
  async getUsers() {
    return this.userService.users({});
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.user({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException({
        message: 'Email has been existed',
      });
    }
    const hashedPassword = await this.bcryptService.hash(
      createUserDto.password,
    );
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }
}

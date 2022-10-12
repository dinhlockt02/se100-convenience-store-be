import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'test@domain.com' })
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  @ApiProperty({ required: true, minLength: 8 })
  password: string;
  @IsString()
  @ApiProperty({ required: true })
  fullname: string;
}

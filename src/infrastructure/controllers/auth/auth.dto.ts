import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ required: true, example: 'test@domain.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: true, minLength: 8 })
  @IsString()
  @MinLength(8)
  readonly password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ required: true, example: 'test@domain.com' })
  @IsNotEmpty()
  @IsEmail()
  readonly email;
}

export class ResetPasswordDto {
  @ApiProperty({ required: true, example: 'example-token' })
  @IsNotEmpty()
  readonly token: string;

  @ApiProperty({ required: true, minLength: 8 })
  @IsString()
  @MinLength(8)
  readonly password: string;
}

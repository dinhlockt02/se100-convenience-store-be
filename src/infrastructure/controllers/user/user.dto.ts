import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

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
  @IsDate()
  @ApiProperty({ required: true })
  birthday: Date;
  @IsNumberString()
  @ApiProperty({ required: true })
  identityNumber: string;
  @IsEnum(Gender)
  @ApiProperty({ required: true })
  gender: Gender;
  @IsNumberString()
  @ApiProperty({ required: true })
  phoneNumber: string;
  @IsString()
  @ApiProperty({ required: true })
  address: string;
  @IsString()
  @ApiProperty({ required: true })
  other: string;
  @IsUrl()
  @ApiProperty({ required: true })
  avatar: string;
}

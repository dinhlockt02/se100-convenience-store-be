import { Logger } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumberString,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Gender, UserEntity } from 'src/core/entities/user.entity';

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
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ required: true, type: Date })
  birthday: Date;
  @IsNumberString()
  @ApiProperty({ required: true, example: '1234567890' })
  identityNumber: string;
  @IsEnum(Gender)
  @ApiProperty({ required: true, enum: Gender })
  gender: Gender;
  @IsNumberString()
  @ApiProperty({ required: true, example: '1234567890' })
  phoneNumber: string;
  @IsString()
  @ApiProperty({ required: true })
  address: string;
  @IsString()
  @ApiProperty({ required: true })
  other: string;
  @IsUrl()
  @ApiProperty({ required: true, example: 'http://example.com/a.jpg' })
  avatar: string;

  toEntity(): UserEntity {
    const newUserEntity = new UserEntity();
    newUserEntity.email = this.email;
    newUserEntity.password = this.password;
    newUserEntity.fullname = this.fullname;
    newUserEntity.birthday = this.birthday;
    newUserEntity.identityNumber = this.identityNumber;
    newUserEntity.gender = this.gender;
    newUserEntity.phoneNumber = this.phoneNumber;
    newUserEntity.address = this.address;
    newUserEntity.other = this.other;
    newUserEntity.avatar = this.avatar;
    return newUserEntity;
  }

  static toEntity(createUserDto): UserEntity {
    const newUserEntity = new UserEntity();
    newUserEntity.email = createUserDto.email;
    newUserEntity.password = createUserDto.password;
    newUserEntity.fullname = createUserDto.fullname;
    newUserEntity.birthday = new Date(createUserDto.birthday);
    newUserEntity.identityNumber = createUserDto.identityNumber;
    newUserEntity.gender = createUserDto.gender;
    newUserEntity.phoneNumber = createUserDto.phoneNumber;
    newUserEntity.address = createUserDto.address;
    newUserEntity.other = createUserDto.other;
    newUserEntity.avatar = createUserDto.avatar;
    return newUserEntity;
  }
}

export class UpdateUserDto {
  @ApiProperty({ required: true, example: '1' })
  @ValidateIf((object, value) => value !== null && value !== undefined)
  @IsInt()
  id?: number;
  @ApiProperty({ required: true, example: 'test@domain.com' })
  @IsEmail()
  email: string;
  @IsString()
  @ApiProperty({ required: true })
  fullname: string;
  @IsDateString()
  @ApiProperty({ required: true, type: Date })
  birthday: Date;
  @IsNumberString()
  @ApiProperty({ required: true, example: '1234567890' })
  identityNumber: string;
  @IsEnum(Gender)
  @ApiProperty({ required: true, enum: Gender })
  gender: Gender;
  @IsNumberString()
  @ApiProperty({ required: true, example: '1234567890' })
  phoneNumber: string;
  @IsString()
  @ApiProperty({ required: true })
  address: string;
  @IsString()
  @ApiProperty({ required: true })
  other: string;
  @IsUrl()
  @ApiProperty({ required: true, example: 'https://example.com/a.jpg' })
  avatar: string;

  static toEntity(updateUserDto: UpdateUserDto): UserEntity {
    const newUserEntity = new UserEntity();
    newUserEntity.id = updateUserDto.id;
    newUserEntity.email = updateUserDto.email;
    newUserEntity.fullname = updateUserDto.fullname;
    newUserEntity.birthday = new Date(updateUserDto.birthday);
    newUserEntity.identityNumber = updateUserDto.identityNumber;
    newUserEntity.gender = updateUserDto.gender;
    newUserEntity.phoneNumber = updateUserDto.phoneNumber;
    newUserEntity.address = updateUserDto.address;
    newUserEntity.other = updateUserDto.other;
    newUserEntity.avatar = updateUserDto.avatar;
    newUserEntity.password = '';
    return newUserEntity;
  }
}

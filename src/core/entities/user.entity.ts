import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumberString,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { Entity } from './entity';
export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}

export enum Role {
  Manager = 'MANAGER',
  Employee = 'EMPLOYEE',
}

export class UserEntity extends Entity {
  @ValidateIf((object, value) => value !== null && value !== undefined)
  @IsInt()
  id?: number;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  fullname: string;
  @IsDate()
  birthday: Date;
  @IsNumberString()
  identityNumber: string;
  @IsEnum(Gender)
  gender: Gender;
  @IsNumberString()
  phoneNumber: string;
  @IsString()
  address: string;
  @IsString()
  other: string;
  @IsUrl({ require_tld: false })
  avatar: string;
  @IsEnum(Role)
  role: Role;
}

import { IsEmail, IsInt, IsString, ValidateIf } from 'class-validator';
import { Entity } from './entity';

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
}

import {
  IsEmail,
  IsInt,
  IsString,
  validate,
  ValidateIf,
} from 'class-validator';
import { Entity } from './entity';

export class UserEntity implements Entity {
  @ValidateIf((object, value) => value !== null && value !== undefined)
  @IsInt()
  id?: number;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  fullname: string;

  async validateData(): Promise<string[]> {
    const validationErrors = await validate(this);
    if (validationErrors.length !== 0) {
      return validationErrors.map((error) => `Invalid ${error.property}`);
    }
    return [];
  }
}

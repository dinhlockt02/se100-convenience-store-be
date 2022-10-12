import { IsInt, IsString, ValidateIf } from 'class-validator';
import { Entity } from './entity';
import { UserEntity } from './user.entity';

export class ResetPasswordTokenEntity extends Entity {
  @ValidateIf((object, value) => value !== null && value !== undefined)
  @IsString()
  id?: string;
  user: UserEntity;
}

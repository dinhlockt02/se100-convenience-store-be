import {
  IsInt,
  IsString,
  Min,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ValidationArguments } from 'class-validator';
import { Entity } from './entity';

export class ProductItemExpireStateRuleEntity extends Entity {
  @IsInt()
  id: number;
  @IsString()
  stateName: string;
  @IsInt()
  @Min(0)
  val: number;
  @IsString()
  color: string;

  constructor(id: number, stateName: string, val: number, color: string) {
    super();
    this.id = id;
    this.stateName = stateName;
    this.val = val;
    this.color = color;
  }
}

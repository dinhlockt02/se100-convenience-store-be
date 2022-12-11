import {
  IsInt,
  IsString,
  Min,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ValidationArguments } from 'class-validator';
import { Entity } from './entity';

export class ProductItemQuantityStateRuleEntity extends Entity {
  @IsInt()
  id: number;
  @IsString()
  stateName: string;
  @IsInt()
  @Min(0)
  minVal: number;
  @IsInt()
  @IsLargerThanOrEqual('minVal', {
    message: 'Max val must be larger than min val',
  })
  maxVal: number;
  @IsString()
  color: string;

  constructor(
    id: number,
    stateName: string,
    minVal: number,
    maxVal: number,
    color: string,
  ) {
    super();
    this.id = id;
    this.stateName = stateName;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.color = color;
  }
}

export function IsLargerThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLargerThanOrEqual',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'number' &&
            typeof relatedValue === 'number' &&
            value >= relatedValue
          );
        },
      },
    });
  };
}

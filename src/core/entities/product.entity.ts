import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { Entity } from './entity';

export enum ProductStatus {
  OutOfOrder = 'OUT_OF_ORDER',
  InStock = 'IN_STOCK',
  EXPIRE = 'EXPIRE',
  EXPIRE_SOON = 'EXPIRE_SOON',
}

export class ProductEntity extends Entity {
  @ValidateIf((object, value) => value != null && value != undefined)
  @IsInt()
  id?: number;
  @IsString()
  name: string;
  @IsInt()
  @Min(0)
  price: number;
  @IsInt()
  @Min(0)
  cost: number;
  @IsNumber()
  @Max(100)
  @Min(0)
  vat: number;
  @IsOptional()
  @IsEnum(ProductStatus, { each: true })
  status?: ProductStatus[];
  @IsInt()
  amount: number;
  @IsString()
  description: string;
  @IsUrl({ require_tld: false })
  image: string;
  @IsDate()
  expireDate: Date;
}

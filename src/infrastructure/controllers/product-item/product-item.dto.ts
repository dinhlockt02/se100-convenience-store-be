import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString, IsUrl } from 'class-validator';

export class ProductItemDto {
  @IsString()
  @ApiProperty({ required: true })
  productId: number;
  @IsInt()
  @ApiProperty({ required: true })
  deliveryNoteId: string;
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ required: true })
  MFG: Date;
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ required: true })
  EXP: Date;
  @IsInt()
  @ApiProperty({ required: true })
  cost: number;
  @IsInt()
  @ApiProperty({ required: true })
  price: number;
  @IsInt()
  @ApiProperty({ required: true })
  quantity: number;
  @IsString()
  @ApiProperty({ required: true })
  description: string;
  @IsUrl({ require_tld: false })
  @ApiProperty({ required: true })
  image: string;
}

export class UpdateProductItemDto {
  @IsInt()
  @ApiProperty({ required: true })
  price: number;
  @IsString()
  @ApiProperty({ required: true })
  description: string;
  @IsUrl({ require_tld: false })
  @ApiProperty({ required: true })
  image: string;
}

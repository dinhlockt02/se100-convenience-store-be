import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsDate, IsInt, IsUrl } from 'class-validator';
import { ProductItemDto } from '../product-item/product-item.dto';

export class DeliveryNoteItemDto {
  @IsString()
  @ApiProperty({ required: true })
  productId: number;
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
  @IsUrl()
  @ApiProperty({ required: true })
  image: string;
}

export class DeliveryNoteDto {
  @ApiProperty({ required: true, example: 1 })
  providerId: number;
  @Type(() => Date)
  @ApiProperty({ required: true })
  date: Date;
  @ApiProperty({ required: true })
  creatorId: number;
  @ApiProperty({ required: true })
  shipper: string;
  @ApiProperty({ required: true, type: DeliveryNoteItemDto, isArray: true })
  productItems: DeliveryNoteItemDto[];
}

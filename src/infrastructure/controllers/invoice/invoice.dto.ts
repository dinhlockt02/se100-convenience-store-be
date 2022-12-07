import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class InvoiceDetailDto {
  @ApiProperty({ required: true, type: String })
  productItemId: string;
  @ApiProperty({ required: true, type: Number })
  price: number;
  @ApiProperty({ required: true, type: Number })
  quantity: number;
}

export class InvoiceDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ required: true, type: Date })
  date: Date;
  @ApiProperty({ required: true, type: Number })
  userId: number;
  @ApiProperty({ required: true, type: Number })
  total: number;
  @ApiProperty({ required: true, type: InvoiceDetailDto, isArray: true })
  details: InvoiceDetailDto[];
}

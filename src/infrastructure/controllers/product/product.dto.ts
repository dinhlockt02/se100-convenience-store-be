import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/core/entities/product.entity';

export class ProductDto {
  @ApiProperty({ required: true })
  title: string;
  @ApiProperty({ example: 10, required: true })
  tax: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/core/entities/product.entity';

export class ProductPresenter {
  @ApiProperty({ required: true })
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({ example: 10 })
  tax: number;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.title = productEntity.title;
    this.tax = productEntity.tax;
  }
}

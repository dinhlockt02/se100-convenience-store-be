import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/core/entities/product.entity';

export class ProductPresenter {
  @ApiProperty({ required: true })
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({ example: 10 })
  tax: number;
  @ApiProperty()
  updatedAt: Date;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.title = productEntity.title;
    this.tax = productEntity.tax;
    this.updatedAt = productEntity.updatedAt;
  }
}

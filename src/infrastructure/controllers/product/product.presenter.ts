import { ApiProperty } from '@nestjs/swagger';

import { Entity } from 'src/core/entities/entity';
import { ProductEntity, ProductStatus } from 'src/core/entities/product.entity';

export class ProductPresenter extends Entity {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  vat: number;
  @ApiProperty({ enum: ProductStatus })
  status: ProductStatus[];
  @ApiProperty()
  amount: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  expireDate: Date;

  constructor(productEntity: ProductEntity) {
    super();
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.price = productEntity.price;
    this.cost = productEntity.cost;
    this.vat = productEntity.vat;
    this.status = productEntity.status;
    this.amount = productEntity.amount;
    this.description = productEntity.description;
    this.image = productEntity.image;
    this.expireDate = productEntity.expireDate;
  }
}

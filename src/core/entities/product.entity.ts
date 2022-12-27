import { IsArray, IsInt, IsNumber, IsString, Min } from 'class-validator';
import { Entity } from './entity';
import { ProductItemEntity } from './product-item.entity';
import { ProviderEntity } from './provider.entity';

export class ProductEntity extends Entity {
  @IsInt()
  id: number;
  @IsString()
  title: string;
  @IsNumber()
  @Min(0)
  tax: number;
  @IsArray()
  providers: ProviderEntity[];
  @IsArray()
  productItems: ProductItemEntity[];
  updatedAt: Date;

  constructor(id: number, title: string, tax: number, updatedAt: Date) {
    super();
    this.id = id;
    this.title = title;
    this.tax = tax;
    this.providers = [];
    this.productItems = [];
    this.updatedAt = updatedAt;
  }

  copyWith(title: string, tax: number): ProductEntity {
    return new ProductEntity(
      this.id,
      title ?? this.title,
      tax ?? this.tax,
      this.updatedAt,
    );
  }
}

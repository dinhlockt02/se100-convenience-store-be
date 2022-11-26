import { IsArray, IsInt, IsNumber, IsString, Min } from 'class-validator';
import { Entity } from './entity';
import { ProductItemEntity } from './product-item.entity';
import { ProviderEntity } from './provider.entity';

export class ProductEntity extends Entity {
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsNumber()
  @Min(0)
  tax: number;
  @IsArray()
  providers: ProviderEntity[];
  @IsArray()
  productItems: ProductItemEntity[];

  constructor(id: string, title: string, tax: number) {
    super();
    this.id = id;
    this.title = title;
    this.tax = tax;
    this.providers = [];
    this.productItems = [];
  }

  copyWith(title: string, tax: number): ProductEntity {
    return new ProductEntity(this.id, title ?? this.title, tax ?? this.tax);
  }
}

import { IsArray, IsDate, IsInt, Min } from 'class-validator';
import { Entity } from './entity';
import { ProductItemEntity } from './product-item.entity';
import { ProviderEntity } from './provider.entity';

export class DeliveryNoteEntity extends Entity {
  @IsInt()
  id: number;
  provider: ProviderEntity;
  @IsDate()
  date: Date;
  @IsInt()
  @Min(0)
  total: number;
  @IsArray()
  productItems: ProductItemEntity[];

  constructor(id: number, total: number, provider: ProviderEntity, date: Date) {
    super();
    this.id = id;
    this.provider = provider;
    this.date = date;
    this.total = total;
    this.productItems = [];
  }
}

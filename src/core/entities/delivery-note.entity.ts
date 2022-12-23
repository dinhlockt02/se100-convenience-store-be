import { IsArray, IsDate, IsInt, Min } from 'class-validator';
import { Entity } from './entity';
import { ProductItemEntity } from './product-item.entity';
import { ProviderEntity } from './provider.entity';
import { UserEntity } from './user.entity';

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
  creator: UserEntity;
  shipper: string;
  totalQuantity: number;

  constructor(
    id: number,
    total: number,
    provider: ProviderEntity,
    date: Date,
    creator: UserEntity,
    shipper: string,
    totalQuantity: number,
  ) {
    super();
    this.id = id;
    this.provider = provider;
    this.date = date;
    this.total = total;
    this.productItems = [];
    this.creator = creator;
    this.shipper = shipper;
    this.totalQuantity = totalQuantity;
  }
}

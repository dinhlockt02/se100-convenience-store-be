import { IsArray, IsDate, IsInt, IsString, Min } from 'class-validator';
import { randomUUID } from 'crypto';
import { Entity } from './entity';
import { ProductItemEntity } from './product-item.entity';
import { ProviderEntity } from './provider.entity';
import { UserEntity } from './user.entity';

export class DeliveryNoteEntity extends Entity {
  @IsString()
  id: string;
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
    id: string,
    total: number,
    provider: ProviderEntity,
    date: Date,
    creator: UserEntity,
    shipper: string,
    totalQuantity: number,
  ) {
    super();
    if (!id) {
      id = DeliveryNoteEntity.newId();
    }
    this.id = id;
    this.provider = provider;
    this.date = date;
    this.total = total;
    this.productItems = [];
    this.creator = creator;
    this.shipper = shipper;
    this.totalQuantity = totalQuantity;
  }

  static newId(): string {
    return randomUUID();
  }
}

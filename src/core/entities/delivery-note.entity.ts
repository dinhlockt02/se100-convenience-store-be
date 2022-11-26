import { Provider } from '@nestjs/common';
import { Entity } from './entity';
import { ProductItemEntity } from './product-item.entity';

export class DeliveryNoteEntity extends Entity {
  id: number;
  provider: Provider;
  date: Date;
  total: number;
  productItems: ProductItemEntity[];
}

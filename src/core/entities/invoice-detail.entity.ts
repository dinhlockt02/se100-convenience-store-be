import { Entity } from './entity';
import { InvoiceEntity } from './invoice.entity';
import { ProductItemEntity } from './product-item.entity';

export class InvoiceDetailEntity extends Entity {
  productItem: ProductItemEntity;
  invoice: InvoiceEntity;
  price: number;
  quantity: number;
}

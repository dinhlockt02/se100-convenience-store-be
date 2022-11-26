import { DeliveryNoteEntity } from './delivery-note.entity';
import { Entity } from './entity';
import { InvoiceDetailEntity } from './invoice-detail.entity';
import { ProductEntity } from './product.entity';

export class ProductItemEntity extends Entity {
  id: string;
  product: ProductEntity;
  deliveryNote: DeliveryNoteEntity;
  MFG: Date;
  EXP: Date;
  cost: number;
  price: number;
  quantity: number;
  description: string;
  image: string;
  invoiceDetails: InvoiceDetailEntity[];
}

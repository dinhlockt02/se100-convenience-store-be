import { Entity } from './entity';
import { InvoiceDetailEntity } from './invoice-detail.entity';
import { UserEntity } from './user.entity';

export class InvoiceEntity extends Entity {
  id: string;
  date: Date;
  creator: UserEntity;
  userId: number;
  total: number;
  invoiceDetails: InvoiceDetailEntity[];
}

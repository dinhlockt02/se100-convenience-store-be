import { randomUUID } from 'crypto';
import { Entity } from './entity';
import { InvoiceDetailEntity } from './invoice-detail.entity';
import { UserEntity } from './user.entity';

export class InvoiceEntity extends Entity {
  id: string;
  date: Date;
  creator: UserEntity;
  total: number;
  invoiceDetails: InvoiceDetailEntity[];

  constructor(
    id: string,
    date: Date,
    creator: UserEntity,
    total: number,
    invoiceDetails: InvoiceDetailEntity[],
  ) {
    super();
    if (!id) {
      id = InvoiceEntity.newId();
    }
    this.id = id;
    this.date = date;
    this.creator = creator;
    this.total = total;
    this.invoiceDetails = invoiceDetails;
  }

  static newId(): string {
    return randomUUID();
  }
}

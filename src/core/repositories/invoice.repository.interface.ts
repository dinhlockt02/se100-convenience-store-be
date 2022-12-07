import { InvoiceEntity } from '../entities/invoice.entity';

export interface IInvoiceRepository {
  createInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity>;

  getInvoices(): Promise<InvoiceEntity[]>;
  getInvoiceById(id: string): Promise<InvoiceEntity>;
}

export const IInvoiceRepositoryLabel = 'IInvoiceRepositoryLabel';

import { Inject, Injectable } from '@nestjs/common';
import { InvoiceEntity } from 'src/core/entities/invoice.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IInvoiceRepository,
  IInvoiceRepositoryLabel,
} from 'src/core/repositories/invoice.repository.interface';

@Injectable()
export class GetInvoicesUsecase {
  constructor(
    @Inject(IInvoiceRepositoryLabel)
    private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  async execute(): Promise<InvoiceEntity[]> {
    const invoices = await this.invoiceRepository.getInvoices();
    return invoices;
  }
}

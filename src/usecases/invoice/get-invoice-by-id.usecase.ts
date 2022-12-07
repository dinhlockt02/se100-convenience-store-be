import { Inject, Injectable } from '@nestjs/common';
import { InvoiceEntity } from 'src/core/entities/invoice.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IInvoiceRepository,
  IInvoiceRepositoryLabel,
} from 'src/core/repositories/invoice.repository.interface';

@Injectable()
export class GetInvoiceByIdUsecase {
  constructor(
    @Inject(IInvoiceRepositoryLabel)
    private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  async execute(id: string): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.getInvoiceById(id);
    if (!invoice) {
      throw new CoreException.NotFoundException('Invoice not found');
    }
    return invoice;
  }
}

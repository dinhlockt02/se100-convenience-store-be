import { Inject, Injectable } from '@nestjs/common';
import { InvoiceDetailEntity } from 'src/core/entities/invoice-detail.entity';
import { InvoiceEntity } from 'src/core/entities/invoice.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IInvoiceRepository,
  IInvoiceRepositoryLabel,
} from 'src/core/repositories/invoice.repository.interface';
import { GetProductItemByIdUsecase } from '../product-item/get-product-item-by-id.usecase';
import { GetUserByIdUsecase } from '../user/get-users-by-id.usecase';

@Injectable()
export class CreateInvoiceUsecase {
  constructor(
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
    private readonly getProductItemByIdUsecase: GetProductItemByIdUsecase,
    @Inject(IInvoiceRepositoryLabel)
    private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  async execute(
    date: Date,
    userId: number,
    total: number,
    details: {
      productItemId: string;
      price: number;
      quantity: number;
    }[],
  ): Promise<InvoiceEntity> {
    const invoice = new InvoiceEntity();
    invoice.date = date;
    invoice.creator = await this.getUserByIdUsecase.execute(userId);
    invoice.total = total;
    invoice.invoiceDetails = await Promise.all(
      details.map(async (detail) => {
        const productItem = await this.getProductItemByIdUsecase.execute(
          detail.productItemId,
        );
        if (productItem.quantity < detail.quantity) {
          throw new CoreException.ConflictException(
            `Invalid quantity of product item ${detail.productItemId}`,
          );
        }

        const invoiceDetail = new InvoiceDetailEntity();
        invoiceDetail.productItem = productItem;
        invoiceDetail.invoice = invoice;
        invoiceDetail.price = detail.price;
        invoiceDetail.quantity = detail.quantity;
        return invoiceDetail;
      }),
    );

    return await this.invoiceRepository.createInvoice(invoice);
  }
}

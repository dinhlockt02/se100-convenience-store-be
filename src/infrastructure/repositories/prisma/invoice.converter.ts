import {
  DeliveryNote,
  Invoice,
  InvoiceDetail,
  Prisma,
  Product,
  ProductItem,
  Provider,
  User,
} from '@prisma/client';
import { InvoiceDetailEntity } from 'src/core/entities/invoice-detail.entity';
import { InvoiceEntity } from 'src/core/entities/invoice.entity';
import { ProductItemConverter } from './product-item.converter';
import { UserConverter } from './user.converter';

export class InvoiceConverter {
  static toInvoiceCreateInput(
    invoice: InvoiceEntity,
  ): Prisma.InvoiceCreateInput {
    return {
      id: InvoiceEntity.newId(),
      date: invoice.date,
      creator: {
        connect: {
          id: invoice.creator.id,
        },
      },
      total: invoice.total,
      InvoiceDetail: {
        create: invoice.invoiceDetails.map((detail) => {
          return {
            productItemId: detail.productItem.id,
            price: detail.price,
            quantity: detail.quantity,
          };
        }),
      },
    };
  }

  static toInvoiceEntity(
    invoice: Invoice & {
      creator: User;
    },
  ): InvoiceEntity {
    if (!invoice) {
      return null;
    }
    const entity = new InvoiceEntity(
      invoice.id,
      invoice.date,
      UserConverter.toEntity(invoice.creator),
      invoice.total,
      null,
    );
    return entity;
  }
  static toInvoiceEntityWithInvoiceDetail(
    invoice: Invoice & {
      creator: User;
      InvoiceDetail: (InvoiceDetail & {
        productItem: ProductItem & {
          product: Product;
          deliveryNote: DeliveryNote & { provider: Provider; creator: User };
        };
      })[];
    },
  ): InvoiceEntity {
    if (!invoice) {
      return null;
    }
    const invoiceDetails = invoice.InvoiceDetail.map((detail) => {
      const detailEntity = new InvoiceDetailEntity();
      detailEntity.invoice = entity;
      detailEntity.productItem = ProductItemConverter.toProductItemEntity(
        detail.productItem,
      );
      detailEntity.price = detail.price;
      detailEntity.quantity = detail.quantity;
      return detailEntity;
    });
    const entity = new InvoiceEntity(
      invoice.id,
      invoice.date,
      UserConverter.toEntity(invoice.creator),
      invoice.total,
      invoiceDetails,
    );

    return entity;
  }
}

import { Injectable } from '@nestjs/common';
import { InvoiceEntity } from 'src/core/entities/invoice.entity';
import { CoreException } from 'src/core/exceptions';
import { IInvoiceRepository } from 'src/core/repositories/invoice.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { InvoiceConverter } from './invoice.converter';

@Injectable()
export class InvoiceRepository implements IInvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity> {
    try {
      await this.prisma.$transaction([
        this.prisma.invoice.create({
          data: InvoiceConverter.toInvoiceCreateInput(invoice),
        }),
        ...invoice.invoiceDetails.map((detail) => {
          return this.prisma.productItem.update({
            where: {
              id: detail.productItem.id,
            },
            data: {
              quantity: {
                decrement: detail.quantity,
              },
            },
          });
        }),
      ]);
      return invoice;
    } catch (error) {
      throw new CoreException.DatabaseException('create invoice failed');
    }
  }
  async getInvoices(): Promise<InvoiceEntity[]> {
    try {
      const prismaInvoices = await this.prisma.invoice.findMany({
        include: {
          creator: true,
          InvoiceDetail: {
            include: {
              productItem: {
                include: {
                  deliveryNote: {
                    include: {
                      provider: true,
                    },
                  },
                  product: true,
                },
              },
            },
          },
        },
      });
      return prismaInvoices.map((prismaInvoice) =>
        InvoiceConverter.toInvoiceEntityWithInvoiceDetail(prismaInvoice),
      );
    } catch (error) {
      throw new CoreException.DatabaseException('create invoice failed');
    }
  }
  async getInvoiceById(id: string): Promise<InvoiceEntity> {
    try {
      const prismaInvoice = await this.prisma.invoice.findUnique({
        where: {
          id,
        },
        include: {
          creator: true,
          InvoiceDetail: {
            include: {
              productItem: {
                include: {
                  deliveryNote: {
                    include: {
                      provider: true,
                    },
                  },
                  product: true,
                },
              },
            },
          },
        },
      });
      return InvoiceConverter.toInvoiceEntityWithInvoiceDetail(prismaInvoice);
    } catch (error) {
      throw new CoreException.DatabaseException('create invoice failed');
    }
  }
}

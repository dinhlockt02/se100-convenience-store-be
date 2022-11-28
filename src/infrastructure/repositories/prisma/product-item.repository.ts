import { Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { CoreException } from 'src/core/exceptions';
import { IProductItemRepository } from 'src/core/repositories/product-item.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductItemConverter } from './product-item.converter';

@Injectable()
export class ProductItemRepository implements IProductItemRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getProductItemByDeliveryNote(
    deliveryNoteId: number,
  ): Promise<ProductItemEntity[]> {
    const productItems = await this.prisma.productItem.findMany({
      where: {
        deliveryNoteId,
      },
      include: {
        deliveryNote: {
          include: {
            provider: true,
          },
        },
        product: true,
      },
    });
    return productItems.map((productItem) =>
      ProductItemConverter.toProductItemEntity(productItem),
    );
  }
  async createProductItem(
    productItem: ProductItemEntity,
  ): Promise<ProductItemEntity> {
    try {
      const createdProductItem = await this.prisma.productItem.create({
        data: ProductItemConverter.toProductItemreateInput(productItem),
        include: {
          deliveryNote: {
            include: {
              provider: true,
            },
          },
          product: true,
        },
      });
      return ProductItemConverter.toProductItemEntity(createdProductItem);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async deleteProductItem(productItemId: string) {
    try {
      await this.prisma.productItem.delete({
        where: {
          id: productItemId,
        },
      });
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
}

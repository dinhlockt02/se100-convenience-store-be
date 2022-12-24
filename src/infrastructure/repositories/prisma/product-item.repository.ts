import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { CoreException } from 'src/core/exceptions';
import { IProductItemRepository } from 'src/core/repositories/product-item.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductItemConverter } from './product-item.converter';

@Injectable()
export class ProductItemRepository implements IProductItemRepository {
  constructor(private readonly prisma: PrismaService) {}
  async updateProductItem(
    productItem: ProductItemEntity,
  ): Promise<ProductItemEntity> {
    try {
      const updatedProductItem = await this.prisma.productItem.update({
        where: {
          id: productItem.id,
        },
        data: {
          price: productItem.price,
          image: productItem.image,
          description: productItem.description,
        },
        include: {
          deliveryNote: {
            include: {
              provider: true,
              creator: true,
            },
          },
          product: true,
        },
      });
      return ProductItemConverter.toProductItemEntity(updatedProductItem);
    } catch (error) {}
  }
  async getProductItems(): Promise<ProductItemEntity[]> {
    const productItems = await this.prisma.productItem.findMany({
      include: {
        deliveryNote: {
          include: {
            provider: true,
            creator: true,
          },
        },
        product: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return productItems.map((productItem) =>
      ProductItemConverter.toProductItemEntity(productItem),
    );
  }
  async getProductItemById(id: string): Promise<ProductItemEntity> {
    const productItem = await this.prisma.productItem.findUnique({
      where: {
        id,
      },
      include: {
        deliveryNote: {
          include: {
            provider: true,
            creator: true,
          },
        },
        product: true,
      },
    });
    return ProductItemConverter.toProductItemEntity(productItem);
  }
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
            creator: true,
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
      const [createdProductItem] = await this.prisma.$transaction([
        this.prisma.productItem.create({
          data: ProductItemConverter.toProductItemreateInput(productItem),
          include: {
            deliveryNote: {
              include: {
                provider: true,
                creator: true,
              },
            },
            product: true,
          },
        }),
        this.prisma.deliveryNote.update({
          where: {
            id: productItem.deliveryNote.id,
          },
          data: {
            totalQuantity: {
              increment: productItem.initialQuantity,
            },
            total: {
              increment: productItem.cost * productItem.initialQuantity,
            },
          },
        }),
      ]);
      return ProductItemConverter.toProductItemEntity(createdProductItem);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async deleteProductItem(productItemId: string) {
    try {
      await this.prisma.$transaction(async (tx) => {
        const productItem = await tx.productItem.delete({
          where: {
            id: productItemId,
          },
        });
        await this.prisma.deliveryNote.update({
          where: {
            id: productItem.deliveryNoteId,
          },
          data: {
            totalQuantity: {
              decrement: productItem.initialQuantity,
            },
            total: {
              decrement: productItem.cost * productItem.initialQuantity,
            },
          },
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2003') {
          throw new CoreException.ConflictException(
            'Product item has been used.',
          );
        }
      }
      throw new CoreException.DatabaseException(error);
    }
  }
}

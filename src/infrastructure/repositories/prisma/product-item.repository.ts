import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import e from 'express';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { CoreException } from 'src/core/exceptions';
import { IProductItemRepository } from 'src/core/repositories/product-item.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductItemConverter } from './product-item.converter';

@Injectable()
export class ProductItemRepository implements IProductItemRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getProductItems(): Promise<ProductItemEntity[]> {
    const productItems = await this.prisma.productItem.findMany({
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
  async getProductItemById(id: string): Promise<ProductItemEntity> {
    const productItem = await this.prisma.productItem.findUnique({
      where: {
        id,
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

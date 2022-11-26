import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/core/entities/product.entity';
import { CoreException } from 'src/core/exceptions';
import { IProductRepository } from 'src/core/repositories/product.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductConverter } from './product.converter';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateProduct(product: ProductEntity): Promise<ProductEntity> {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: {
          id: product.id,
        },
        data: ProductConverter.toProductUpdateInput(product),
      });
      return ProductConverter.fromPrismaProduct(updatedProduct);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async deleteProduct(id: string) {
    try {
      await this.prisma.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async getProductById(id: string): Promise<ProductEntity> {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id,
        },
      });
      return ProductConverter.fromPrismaProduct(product);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    try {
      const createdProduct = await this.prisma.product.create({
        data: ProductConverter.toProductCreateInput(product),
      });
      return ProductConverter.fromPrismaProduct(createdProduct);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async getProducts(): Promise<ProductEntity[]> {
    try {
      const products = await this.prisma.product.findMany();
      return products.map((product) =>
        ProductConverter.fromPrismaProduct(product),
      );
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
}

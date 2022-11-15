import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/core/entities/product.entity';
import { IProductRepository } from 'src/core/repositories/product.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductConverter } from './product.converter';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProductById(id: number): Promise<ProductEntity> {
    const prismaProduct = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!prismaProduct) {
      return null;
    }
    return ProductConverter.toEntity(prismaProduct);
  }
  async createProduct(productEntity: ProductEntity): Promise<ProductEntity> {
    const prismaProduct = await this.prisma.product.create({
      data: ProductConverter.fromEntity(productEntity),
    });
    return ProductConverter.toEntity(prismaProduct);
  }
  async getProduct(): Promise<ProductEntity[]> {
    const prismaProducts = await this.prisma.product.findMany();
    return prismaProducts.map((prismaProduct) =>
      ProductConverter.toEntity(prismaProduct),
    );
  }
  async updateProduct(updatedProduct: ProductEntity): Promise<ProductEntity> {
    const prismaProduct = await this.prisma.product.update({
      where: {
        id: updatedProduct.id,
      },
      data: ProductConverter.fromEntity(updatedProduct),
    });
    return ProductConverter.toEntity(prismaProduct);
  }
  async deleteProduct(id: number): Promise<void> {
    await this.prisma.product.deleteMany({
      where: {
        id: id,
      },
    });
  }
}

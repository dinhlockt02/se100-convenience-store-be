import { Injectable } from '@nestjs/common';
import { Provider } from '@prisma/client';
import { ProductEntity } from 'src/core/entities/product.entity';
import { ProviderEntity } from 'src/core/entities/provider.entity';
import { CoreException } from 'src/core/exceptions';
import { IProductRepository } from 'src/core/repositories/product.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductConverter } from './product.converter';
import { ProviderConverter } from './provider.converter';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async addProvider(
    providerId: number[],
    productId: number,
  ): Promise<ProviderEntity[]> {
    try {
      const providers = await this.prisma.$transaction(async (tx) => {
        await tx.providersOnProducts.createMany({
          data: providerId.map((id) => {
            return {
              productId: productId,
              providerId: id,
            };
          }),
        });
        return await tx.$queryRaw<Provider[]>`
        SELECT Provider.id, Provider.name, Provider.address, Provider.email, Provider.phone, Provider.representative
        FROM Provider
        INNER JOIN ProvidersOnProducts
        ON Provider.id = ProvidersOnProducts.providerId
        INNER JOIN Product
        ON ProvidersOnProducts.productId = Product.id
        WHERE Product.id = ${productId}`;
      });
      return providers.map((provider) =>
        ProviderConverter.fromPrismaProvider(provider),
      );
    } catch (error) {
      if (error.code == 'P2002') {
        throw new CoreException.ConflictException('Provider has been added.');
      }
      if (error.code == 'P2003') {
        throw new CoreException.NotFoundException('Provider not found');
      }
      throw new CoreException.DatabaseException('Add provider failed');
    }
  }
  async getProviders(productId: string): Promise<ProviderEntity[]> {
    try {
      const providers = await this.prisma.$queryRaw<Provider[]>`
      SELECT Provider.id, Provider.name, Provider.address, Provider.email, Provider.phone, Provider.representative
      FROM Provider
      INNER JOIN ProvidersOnProducts
      ON Provider.id = ProvidersOnProducts.providerId
      INNER JOIN Product
      ON ProvidersOnProducts.productId = Product.id
      WHERE Product.id = ${productId}`;

      return providers.map((provider) =>
        ProviderConverter.fromPrismaProvider(provider),
      );
    } catch (error) {
      throw new CoreException.DatabaseException(error.code);
    }
  }
  async removeProvider(
    providerId: number[],
    productId: number,
  ): Promise<ProviderEntity[]> {
    try {
      const providers = await this.prisma.$transaction(async (tx) => {
        await tx.providersOnProducts.deleteMany({
          where: {
            productId: productId,
            providerId: {
              in: providerId,
            },
          },
        });

        return await tx.$queryRaw<Provider[]>`
        SELECT Provider.id, Provider.name, Provider.address, Provider.email, Provider.phone, Provider.representative
        FROM Provider
        INNER JOIN ProvidersOnProducts
        ON Provider.id = ProvidersOnProducts.providerId
        INNER JOIN Product
        ON ProvidersOnProducts.productId = Product.id
        WHERE Product.id = ${productId}`;
      });
      return providers.map((provider) =>
        ProviderConverter.fromPrismaProvider(provider),
      );
    } catch (error) {
      if (error.code == 'P2025') {
        throw new CoreException.ConflictException(
          'Provider has not been added.',
        );
      }
      if (error.code == 'P2002') {
        throw new CoreException.ConflictException('Provider has been added.');
      }
      if (error.code == 'P2003') {
        throw new CoreException.NotFoundException('Provider not found');
      }
      throw new CoreException.DatabaseException(error.code);
    }
  }

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
  async deleteProduct(id: number) {
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
  async getProductById(id: number): Promise<ProductEntity> {
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
      const products = await this.prisma.product.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return products.map((product) =>
        ProductConverter.fromPrismaProduct(product),
      );
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
}

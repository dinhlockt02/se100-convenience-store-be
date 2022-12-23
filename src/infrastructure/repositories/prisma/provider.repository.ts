import { Injectable } from '@nestjs/common';
import { Product, Provider } from '@prisma/client';
import { ProductEntity } from 'src/core/entities/product.entity';
import { ProviderEntity } from 'src/core/entities/provider.entity';
import { CoreException } from 'src/core/exceptions';
import { IProviderRepository } from 'src/core/repositories/provider.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProductConverter } from './product.converter';
import { ProviderConverter } from './provider.converter';

@Injectable()
export class ProviderRepository implements IProviderRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getProducts(providerId: number): Promise<ProductEntity[]> {
    const products = await this.prisma.$queryRaw<Product[]>`
    SELECT Product.id as id, Product.tax as tax, Product.title as title
    FROM Product
    INNER JOIN ProvidersOnProducts
    ON Product.id = ProvidersOnProducts.productId
    INNER JOIN Provider
    ON ProvidersOnProducts.providerId = Provider.id
    WHERE Provider.id = ${providerId}`;
    return products.map((product) =>
      ProductConverter.fromPrismaProduct(product),
    );
  }
  async addProduct(
    providerId: number,
    productId: string,
  ): Promise<ProductEntity[]> {
    try {
      const products = await this.prisma.$transaction(async (tx) => {
        await tx.providersOnProducts.create({
          data: {
            productId: productId,
            providerId: providerId,
          },
        });
        return await tx.$queryRaw<Product[]>`
        SELECT Product.id as id, Product.tax as tax, Product.title as title
        FROM Product
        INNER JOIN ProvidersOnProducts
        ON Product.id = ProvidersOnProducts.productId
        INNER JOIN Provider
        ON ProvidersOnProducts.providerId = Provider.id
        WHERE Provider.id = ${providerId}`;
      });
      return products.map((product) =>
        ProductConverter.fromPrismaProduct(product),
      );
    } catch (error) {
      if (error.code == 'P2002') {
        throw new CoreException.ConflictException('Product has been added.');
      }
      throw new CoreException.DatabaseException('Add product failed');
    }
  }
  async removeProduct(
    providerId: number,
    productId: string,
  ): Promise<ProductEntity[]> {
    try {
      const products = await this.prisma.$transaction(async (tx) => {
        await tx.providersOnProducts.delete({
          where: {
            providerId_productId: {
              productId: productId,
              providerId: providerId,
            },
          },
        });
        return await tx.$queryRaw<Product[]>`
        SELECT Product.id as id, Product.tax as tax, Product.title as title
        FROM Product
        INNER JOIN ProvidersOnProducts
        ON Product.id = ProvidersOnProducts.productId
        INNER JOIN Provider
        ON ProvidersOnProducts.providerId = Provider.id
        WHERE Provider.id = ${providerId}`;
      });
      return products.map((product) =>
        ProductConverter.fromPrismaProduct(product),
      );
    } catch (error) {
      if (error.code == 'P2025') {
        throw new CoreException.ConflictException(
          'Product has not been added.',
        );
      }
      throw new CoreException.DatabaseException(error.code);
    }
  }

  async createProvider(provider: ProviderEntity): Promise<ProviderEntity> {
    try {
      const createdProvider = await this.prisma.provider.create({
        data: ProviderConverter.toProviderCreateInput(provider),
        include: {
          products: true,
        },
      });
      return ProviderConverter.fromPrismaProvider(createdProvider);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async getProviders(): Promise<ProviderEntity[]> {
    try {
      const providers = await this.prisma.provider.findMany({
        include: {
          products: true,
        },
      });
      return providers.map(
        (
          provider: Provider & {
            products: Product[];
          },
        ) => ProviderConverter.fromPrismaProvider(provider),
      );
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async getProvider(id: number): Promise<ProviderEntity> {
    try {
      const provider = await this.prisma.provider.findUnique({
        where: {
          id,
        },
        include: {
          products: true,
        },
      });
      return ProviderConverter.fromPrismaProvider(provider);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async updateProvider(provider: ProviderEntity): Promise<ProviderEntity> {
    try {
      const updatedProvider = await this.prisma.provider.update({
        where: {
          id: provider.id,
        },
        data: ProviderConverter.toProviderUpdateInput(provider),
        include: {
          products: true,
        },
      });
      return ProviderConverter.fromPrismaProvider(updatedProvider);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async deleteProvider(id: number) {
    try {
      await this.prisma.provider.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
}

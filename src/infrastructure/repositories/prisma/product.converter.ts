import { Prisma, Product } from '@prisma/client';
import { ProductEntity } from 'src/core/entities/product.entity';

export class ProductConverter {
  static toProductCreateInput(
    productEntity: ProductEntity,
  ): Prisma.ProductCreateInput {
    return {
      title: productEntity.title,
      tax: productEntity.tax,
    };
  }
  static toProductUpdateInput(
    productEntity: ProductEntity,
  ): Prisma.ProductUpdateInput {
    return {
      title: productEntity.title,
      tax: productEntity.tax,
    };
  }
  static fromPrismaProduct(product: Product): ProductEntity {
    if (!product) {
      return null;
    }
    return new ProductEntity(product.id, product.title, product.tax.toNumber());
  }
}

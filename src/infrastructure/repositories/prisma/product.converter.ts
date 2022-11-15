import { Product as PrismaProduct } from '@prisma/client';
import { ProductEntity, ProductStatus } from 'src/core/entities/product.entity';

export class ProductConverter {
  static toEntity(prismaProduct: PrismaProduct): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.id = prismaProduct.id;
    productEntity.name = prismaProduct.name;
    productEntity.price = prismaProduct.price;
    productEntity.cost = prismaProduct.cost;
    productEntity.vat = prismaProduct.vat;
    productEntity.status = [];

    const interval =
      (prismaProduct.expireDate.getTime() - new Date().getTime()) /
      (1000 * 3600 * 24);

    if (interval < 0) productEntity.status.push(ProductStatus.EXPIRE);
    else if (interval <= 3)
      productEntity.status.push(ProductStatus.EXPIRE_SOON);

    productEntity.status.push(
      prismaProduct.amount > 0
        ? ProductStatus.InStock
        : ProductStatus.OutOfOrder,
    );

    productEntity.amount = prismaProduct.amount;
    productEntity.description = prismaProduct.description;
    productEntity.image = prismaProduct.image;
    productEntity.expireDate = prismaProduct.expireDate;

    return productEntity;
  }

  static fromEntity(productEnitty: ProductEntity): PrismaProduct {
    const prismaProduct = {} as PrismaProduct;
    prismaProduct.id = productEnitty.id;
    prismaProduct.name = productEnitty.name;
    prismaProduct.price = productEnitty.price;
    prismaProduct.cost = productEnitty.cost;
    prismaProduct.vat = productEnitty.vat;
    prismaProduct.amount = productEnitty.amount;
    prismaProduct.description = productEnitty.description;
    prismaProduct.image = productEnitty.image;
    prismaProduct.expireDate = productEnitty.expireDate;
    return prismaProduct;
  }
}

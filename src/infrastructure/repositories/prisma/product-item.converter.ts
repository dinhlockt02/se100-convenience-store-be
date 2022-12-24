import {
  DeliveryNote,
  Prisma,
  Product,
  ProductItem,
  Provider,
  User,
} from '@prisma/client';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { DeliveryNoteConverter } from './delivery-note.converter';
import { ProductConverter } from './product.converter';

export class ProductItemConverter {
  static toProductItemreateInput(
    productItem: ProductItemEntity,
  ): Prisma.ProductItemCreateInput {
    return {
      product: {
        connect: {
          id: productItem.product.id,
        },
      },
      deliveryNote: {
        connect: {
          id: productItem.deliveryNote.id,
        },
      },
      MFG: productItem.MFG,
      EXP: productItem.EXP,
      cost: productItem.cost,
      price: productItem.price,
      quantity: productItem.quantity,
      initialQuantity: productItem.initialQuantity,
      description: productItem.description,
      image: productItem.image,
    };
  }

  static toProductItemEntity(
    productItem: ProductItem & {
      product: Product;
      deliveryNote: DeliveryNote & { provider: Provider; creator: User };
    },
  ): ProductItemEntity {
    if (!productItem) {
      return null;
    }
    return new ProductItemEntity(
      productItem.id,
      ProductConverter.fromPrismaProduct(productItem.product),
      DeliveryNoteConverter.toDeliveryNoteEntity(productItem.deliveryNote),
      productItem.MFG,
      productItem.EXP,
      productItem.cost,
      productItem.price,
      productItem.quantity,
      productItem.initialQuantity,
      productItem.description,
      productItem.image,
      [],
      productItem.updatedAt,
    );
  }
}

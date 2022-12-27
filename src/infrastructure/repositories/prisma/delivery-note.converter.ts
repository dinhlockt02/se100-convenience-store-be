import { DeliveryNote, Prisma, Provider, User } from '@prisma/client';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { CreateProductItemDto } from 'src/core/repositories/delivery-note.repository.interface';
import { ProviderConverter } from './provider.converter';
import { UserConverter } from './user.converter';

export class DeliveryNoteConverter {
  static toDeliveryNoteCreateInput(
    deliveryNote: DeliveryNoteEntity,
    total: number,
    totalQuantity: number,
  ): Prisma.DeliveryNoteCreateInput {
    return {
      id: deliveryNote.id,
      provider: {
        connect: {
          id: deliveryNote.provider.id,
        },
      },
      date: deliveryNote.date,
      total: total,
      shipper: deliveryNote.shipper,
      creator: {
        connect: {
          id: deliveryNote.creator.id,
        },
      },
      totalQuantity: totalQuantity,
    };
  }
  static toDeliveryNoteEntity(
    deliveryNote: DeliveryNote & { provider: Provider; creator: User },
  ): DeliveryNoteEntity {
    if (!deliveryNote) {
      return null;
    }
    const entity = new DeliveryNoteEntity(
      deliveryNote.id,
      deliveryNote.total,
      ProviderConverter.fromPrismaProvider(deliveryNote.provider),
      deliveryNote.date,
      UserConverter.toEntity(deliveryNote.creator),
      deliveryNote.shipper,
      deliveryNote.totalQuantity,
    );
    return entity;
  }

  static toProductItemCreateInput(
    productItem: CreateProductItemDto,
    deliveryNoteId: string,
  ): Prisma.ProductItemCreateManyInput {
    return {
      id: ProductItemEntity.newId(),
      productId: productItem.productId,
      deliveryNoteId: deliveryNoteId,
      MFG: productItem.MFG,
      EXP: productItem.EXP,
      cost: productItem.cost,
      price: productItem.price,
      quantity: productItem.quantity,
      initialQuantity: productItem.quantity,
      description: productItem.description,
      image: productItem.image,
    };
  }
}

import { DeliveryNote, Prisma, Provider, User } from '@prisma/client';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { ProviderConverter } from './provider.converter';
import { UserConverter } from './user.converter';

export class DeliveryNoteConverter {
  static toDeliveryNoteCreateInput(
    deliveryNote: DeliveryNoteEntity,
  ): Prisma.DeliveryNoteCreateInput {
    return {
      provider: {
        connect: {
          id: deliveryNote.provider.id,
        },
      },
      date: deliveryNote.date,
      total: deliveryNote.total,
      shipper: deliveryNote.shipper,
      creator: {
        connect: {
          id: deliveryNote.creator.id,
        },
      },
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
}

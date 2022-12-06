import { DeliveryNote, Prisma, Provider } from '@prisma/client';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { ProviderConverter } from './provider.converter';

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
    };
  }
  static toDeliveryNoteEntity(
    deliveryNote: DeliveryNote & { provider: Provider },
  ): DeliveryNoteEntity {
    if (!deliveryNote) {
      return null;
    }
    const entity = new DeliveryNoteEntity(
      deliveryNote.id,
      deliveryNote.total,
      ProviderConverter.fromPrismaProvider(deliveryNote.provider),
      deliveryNote.date,
    );
    return entity;
  }
}

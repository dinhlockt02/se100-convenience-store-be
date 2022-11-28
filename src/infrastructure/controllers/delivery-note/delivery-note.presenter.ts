import { ApiProperty } from '@nestjs/swagger';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { ProviderConverter } from 'src/infrastructure/repositories/prisma/provider.converter';
import { ProviderPresenter } from '../provider/provider.presenter';

export class DeliveryNotePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  provider: ProviderPresenter;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  total: number;

  static fromDeliveryNoteEntity(
    deliveryNote: DeliveryNoteEntity,
  ): DeliveryNotePresenter {
    return {
      id: deliveryNote.id,
      provider: ProviderPresenter.fromEntity(deliveryNote.provider),
      date: deliveryNote.date,
      total: deliveryNote.total,
    };
  }
}

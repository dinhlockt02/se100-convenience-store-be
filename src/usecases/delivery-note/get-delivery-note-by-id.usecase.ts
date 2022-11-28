import { Inject, Injectable } from '@nestjs/common';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IDeliveryNoteRepository,
  IDeliveryNoteRepositoryLabel,
} from 'src/core/repositories/delivery-note.repository.interface';

@Injectable()
export class GetDeliveryNoteByIdUsecase {
  constructor(
    @Inject(IDeliveryNoteRepositoryLabel)
    private readonly deliveryNoteRepository: IDeliveryNoteRepository,
  ) {}

  async execute(id: number): Promise<DeliveryNoteEntity> {
    const deliveryNote = await this.deliveryNoteRepository.getDeliveryNoteById(
      id,
    );
    if (!deliveryNote) {
      throw new CoreException.NotFoundException('Delivery note not found');
    }
    return deliveryNote;
  }
}

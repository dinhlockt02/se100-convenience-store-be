import { Inject, Injectable } from '@nestjs/common';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import {
  IDeliveryNoteRepository,
  IDeliveryNoteRepositoryLabel,
} from 'src/core/repositories/delivery-note.repository.interface';

@Injectable()
export class GetDeliveryNotesUsecase {
  constructor(
    @Inject(IDeliveryNoteRepositoryLabel)
    private readonly deliveryNoteRepository: IDeliveryNoteRepository,
  ) {}

  async execute(): Promise<DeliveryNoteEntity[]> {
    return this.deliveryNoteRepository.getDeliveryNotes();
  }
}

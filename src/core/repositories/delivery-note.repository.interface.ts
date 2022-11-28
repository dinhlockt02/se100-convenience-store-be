import { DeliveryNoteEntity } from '../entities/delivery-note.entity';

export interface IDeliveryNoteRepository {
  createDeliveryNote(
    deliveryNote: DeliveryNoteEntity,
  ): Promise<DeliveryNoteEntity>;

  getDeliveryNotes(): Promise<DeliveryNoteEntity[]>;
  getDeliveryNoteById(id: number): Promise<DeliveryNoteEntity>;
  deleteDeliveryNoteById(id: number);
}

export const IDeliveryNoteRepositoryLabel = 'IDeliveryNoteRepositoryLabel';

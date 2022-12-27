import { Inject } from '@nestjs/common';
import {
  IDeliveryNoteRepository,
  IDeliveryNoteRepositoryLabel,
} from 'src/core/repositories/delivery-note.repository.interface';
import { GetDeliveryNoteByIdUsecase } from './get-delivery-note-by-id.usecase';

export class DeleteDeliveryNoteUsecase {
  constructor(
    @Inject(IDeliveryNoteRepositoryLabel)
    private readonly deliveryNoteRepository: IDeliveryNoteRepository,
    private readonly getDeliveryNoteByIdUsecase: GetDeliveryNoteByIdUsecase,
  ) {}

  async execute(id: string) {
    await this.getDeliveryNoteByIdUsecase.execute(id);
    await this.deliveryNoteRepository.deleteDeliveryNoteById(id);
  }
}

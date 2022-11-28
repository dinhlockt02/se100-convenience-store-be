import { Inject, Injectable } from '@nestjs/common';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IDeliveryNoteRepository,
  IDeliveryNoteRepositoryLabel,
} from 'src/core/repositories/delivery-note.repository.interface';
import { GetProviderByIdUsecase } from '../provider/get-provider-by-id.usecase';

@Injectable()
export class CreateDeliveryNoteUsecase {
  constructor(
    @Inject(IDeliveryNoteRepositoryLabel)
    private readonly deliveryNoteRepository: IDeliveryNoteRepository,
    private readonly getProviderByIdUsecase: GetProviderByIdUsecase,
  ) {}
  async execute(providerId: number, date: Date): Promise<DeliveryNoteEntity> {
    const provider = await this.getProviderByIdUsecase.execute(providerId);
    const deliveryNote = new DeliveryNoteEntity(0, 0, provider, date);
    const errors = await deliveryNote.validateData();
    if (errors && errors.length > 0) {
      throw new CoreException.ValidationException('Invalid data', errors);
    }
    const createdDeliveryNote =
      await this.deliveryNoteRepository.createDeliveryNote(deliveryNote);

    return createdDeliveryNote;
  }
}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IDeliveryNoteRepository,
  IDeliveryNoteRepositoryLabel,
} from 'src/core/repositories/delivery-note.repository.interface';
import { GetProductItemByDeliveryNoteUsecase } from '../product-item/get-product-item-by-delivery-note-id.usecase';

@Injectable()
export class GetDeliveryNoteByIdUsecase {
  constructor(
    @Inject(IDeliveryNoteRepositoryLabel)
    private readonly deliveryNoteRepository: IDeliveryNoteRepository,
    private readonly getProductItemByDeliveryNoteUsecase: GetProductItemByDeliveryNoteUsecase,
  ) {}

  async execute(id: number): Promise<DeliveryNoteEntity> {
    const deliveryNote = await this.deliveryNoteRepository.getDeliveryNoteById(
      id,
    );
    if (!deliveryNote) {
      throw new CoreException.NotFoundException('Delivery note not found');
    }
    const productItems = await this.getProductItemByDeliveryNoteUsecase.execute(
      deliveryNote.id,
    );
    deliveryNote.productItems = productItems;
    return deliveryNote;
  }
}

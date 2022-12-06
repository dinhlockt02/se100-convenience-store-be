import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IDeliveryNoteRepository,
  IDeliveryNoteRepositoryLabel,
} from 'src/core/repositories/delivery-note.repository.interface';
import {
  IProductItemQuantityStateRuleRepository,
  IProductItemQuantityStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';
import { GetProductItemByDeliveryNoteUsecase } from '../product-item/get-product-item-by-delivery-note-id.usecase';

@Injectable()
export class GetDeliveryNoteByIdUsecase {
  constructor(
    @Inject(IDeliveryNoteRepositoryLabel)
    private readonly deliveryNoteRepository: IDeliveryNoteRepository,
    private readonly getProductItemByDeliveryNoteUsecase: GetProductItemByDeliveryNoteUsecase,
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
  ) {}

  async execute(id: number): Promise<DeliveryNoteEntity> {
    const deliveryNote = await this.deliveryNoteRepository.getDeliveryNoteById(
      id,
    );
    if (!deliveryNote) {
      throw new CoreException.NotFoundException('Delivery note not found');
    }
    deliveryNote.productItems =
      await this.getProductItemByDeliveryNoteUsecase.execute(deliveryNote.id);
    return deliveryNote;
  }
}

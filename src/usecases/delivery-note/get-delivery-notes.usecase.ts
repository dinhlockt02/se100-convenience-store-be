import { Inject, Injectable } from '@nestjs/common';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import {
  IDeliveryNoteRepository,
  IDeliveryNoteRepositoryLabel,
} from 'src/core/repositories/delivery-note.repository.interface';
import {
  IProductItemQuantityStateRuleRepositoryLabel,
  IProductItemQuantityStateRuleRepository,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';

@Injectable()
export class GetDeliveryNotesUsecase {
  constructor(
    @Inject(IDeliveryNoteRepositoryLabel)
    private readonly deliveryNoteRepository: IDeliveryNoteRepository,
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
  ) {}

  async execute(): Promise<DeliveryNoteEntity[]> {
    const deliveryNotes = await this.deliveryNoteRepository.getDeliveryNotes();
    return deliveryNotes;
  }
}

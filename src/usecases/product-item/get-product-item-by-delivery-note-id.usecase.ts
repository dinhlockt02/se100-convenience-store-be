import { Inject, Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import {
  IProductItemQuantityStateRuleRepositoryLabel,
  IProductItemQuantityStateRuleRepository,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';
import {
  IProductItemRepositoryLabel,
  IProductItemRepository,
} from 'src/core/repositories/product-item.repository.interface';

@Injectable()
export class GetProductItemByDeliveryNoteUsecase {
  constructor(
    @Inject(IProductItemRepositoryLabel)
    private readonly productItemRepository: IProductItemRepository,
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
  ) {}
  async execute(deliveryNoteId: string): Promise<ProductItemEntity[]> {
    const productItems =
      await this.productItemRepository.getProductItemByDeliveryNote(
        deliveryNoteId,
      );

    return this.productItemQuantityStateRuleRepository.updateState(
      productItems,
    );
  }
}

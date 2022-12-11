import { Inject, Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import {
  IProductItemQuantityStateRuleRepository,
  IProductItemQuantityStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';
import {
  IProductItemRepository,
  IProductItemRepositoryLabel,
} from 'src/core/repositories/product-item.repository.interface';

@Injectable()
export class GetProductItemsUsecase {
  constructor(
    @Inject(IProductItemRepositoryLabel)
    private readonly productItemRepository: IProductItemRepository,
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
  ) {}

  async execute(): Promise<ProductItemEntity[]> {
    const productItems = await this.productItemRepository.getProductItems();
    return this.productItemQuantityStateRuleRepository.updateState(
      productItems,
    );
  }
}

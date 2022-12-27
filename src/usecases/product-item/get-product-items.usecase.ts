import { Inject, Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import {
  IProductItemExpireStateRuleRepository,
  IProductItemExpireStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-expire-state-rule.repository';
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
    @Inject(IProductItemExpireStateRuleRepositoryLabel)
    private readonly produxtItemExpireStateRuleRepository: IProductItemExpireStateRuleRepository,
  ) {}

  async execute(): Promise<ProductItemEntity[]> {
    const productItems = await this.productItemRepository.getProductItems();
    await this.productItemQuantityStateRuleRepository.updateState(productItems);
    return this.produxtItemExpireStateRuleRepository.updateState(productItems);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ProductItemQuantityStateRuleEntity } from 'src/core/entities/product-item-quantity-state-rule.entity';
import {
  IProductItemQuantityStateRuleRepository,
  IProductItemQuantityStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';

@Injectable()
export class GetProductItemStateRulesUsecase {
  constructor(
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
  ) {}
  async execute(): Promise<ProductItemQuantityStateRuleEntity[]> {
    return this.productItemQuantityStateRuleRepository.getProductItemQuantityStateRules();
  }
}

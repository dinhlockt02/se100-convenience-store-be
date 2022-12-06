import { Inject, Injectable } from '@nestjs/common';
import {
  IProductItemQuantityStateRuleRepository,
  IProductItemQuantityStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';
import { GetProductItemQuantityStateRuleByIdUsecase } from './get-product-item-state-rule-by-id.usecase';

@Injectable()
export class DeleteProductItemQuantityStateRuleByIdUsecase {
  constructor(
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
    private readonly getProductItemQuantityStateRuleUsecase: GetProductItemQuantityStateRuleByIdUsecase,
  ) {}
  async execute(id: number) {
    await this.getProductItemQuantityStateRuleUsecase.execute(id);
    await this.productItemQuantityStateRuleRepository.deleteProductItemQuantityStateRule(
      id,
    );
  }
}

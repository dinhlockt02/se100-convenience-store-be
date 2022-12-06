import { Inject, Injectable } from '@nestjs/common';
import { ProductItemQuantityStateRuleEntity } from 'src/core/entities/product-item-quantity-state-rule.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemQuantityStateRuleRepository,
  IProductItemQuantityStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';
import { GetProductItemQuantityStateRuleByIdUsecase } from './get-product-item-state-rule-by-id.usecase';
import { GetProductItemStateRulesUsecase } from './get-product-item-state-rules.usecase';

@Injectable()
export class UpdateProductItemStateRuleUsecase {
  constructor(
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
    private readonly getProductItemQuantityStateRulesUsecase: GetProductItemStateRulesUsecase,
    private readonly getProductItemQuantityStateRuleByIdUsecase: GetProductItemQuantityStateRuleByIdUsecase,
  ) {}
  async execute(
    id: number,
    stateName: string,
    minVal: number,
    maxVal: number,
    color: string,
  ): Promise<ProductItemQuantityStateRuleEntity> {
    const existingRule =
      await this.getProductItemQuantityStateRuleByIdUsecase.execute(id);

    existingRule.stateName = stateName;
    existingRule.minVal = minVal;
    existingRule.maxVal = maxVal;
    existingRule.color = color;

    const errors = await existingRule.validateData();
    if (errors && errors.length > 0) {
      throw new CoreException.ValidationException('invalid data', errors);
    }

    const existingRules =
      await this.getProductItemQuantityStateRulesUsecase.execute();

    existingRules.forEach((rule) => {
      if (rule.id !== existingRule.id) {
        if (
          (rule.maxVal >= existingRule.maxVal &&
            existingRule.maxVal >= rule.minVal) ||
          (rule.maxVal >= existingRule.minVal &&
            existingRule.minVal >= rule.minVal) ||
          (existingRule.maxVal >= rule.minVal &&
            rule.minVal >= existingRule.minVal) ||
          (existingRule.maxVal >= rule.maxVal &&
            rule.maxVal >= existingRule.minVal)
        ) {
          throw new CoreException.ConflictException('Rule is invalid');
        }
      }
    });

    const updated =
      this.productItemQuantityStateRuleRepository.updateProductItemQuantityStateRule(
        existingRule,
      );
    return updated;
  }
}

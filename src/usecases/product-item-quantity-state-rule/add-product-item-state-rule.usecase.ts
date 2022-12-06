import { Inject, Injectable } from '@nestjs/common';
import { ProductItemQuantityStateRuleEntity } from 'src/core/entities/product-item-quantity-state-rule.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemQuantityStateRuleRepository,
  IProductItemQuantityStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';
import { GetProductItemStateRulesUsecase } from './get-product-item-state-rules.usecase';

@Injectable()
export class AddProductItemStateRuleUsecase {
  constructor(
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
    private readonly getProductItemQuantityStateRulesUsecase: GetProductItemStateRulesUsecase,
  ) {}
  async execute(
    stateName: string,
    minVal: number,
    maxVal: number,
    color: string,
  ): Promise<ProductItemQuantityStateRuleEntity> {
    const newRule = new ProductItemQuantityStateRuleEntity(
      0,
      stateName,
      minVal,
      maxVal,
      color,
    );
    const errors = await newRule.validateData();
    if (errors && errors.length > 0) {
      throw new CoreException.ValidationException('invalid data', errors);
    }

    const existingRules =
      await this.getProductItemQuantityStateRulesUsecase.execute();

    existingRules.forEach((rule) => {
      if (
        (rule.maxVal >= newRule.maxVal && newRule.maxVal >= rule.minVal) ||
        (rule.maxVal >= newRule.minVal && newRule.minVal >= rule.minVal) ||
        (newRule.maxVal >= rule.minVal && rule.minVal >= newRule.minVal) ||
        (newRule.maxVal >= rule.maxVal && rule.maxVal >= newRule.minVal)
      ) {
        throw new CoreException.ConflictException('Rule is invalid');
      }
    });

    const createdRule =
      this.productItemQuantityStateRuleRepository.addProductItemQuantityStateRule(
        newRule,
      );
    return createdRule;
  }
}

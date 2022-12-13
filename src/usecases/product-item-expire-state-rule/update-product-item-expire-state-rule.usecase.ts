import { Inject, Injectable } from '@nestjs/common';
import { ProductItemExpireStateRuleEntity } from 'src/core/entities/product-item-expire-state-rule.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemExpireStateRuleRepository,
  IProductItemExpireStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-expire-state-rule.repository';
import { GetProductItemExpireStateRuleByIdUsecase } from './get-product-item-expire-state-rule-by-id.usecase';
import { GetProductItemExpireStateRulesUsecase } from './get-product-item-expire-state-rules.usecase';

@Injectable()
export class UpdateProductItemExpireStateRuleUsecase {
  constructor(
    @Inject(IProductItemExpireStateRuleRepositoryLabel)
    private readonly productItemExpireStateRuleRepository: IProductItemExpireStateRuleRepository,
    private readonly getProductItemExpireStateRulesUsecase: GetProductItemExpireStateRulesUsecase,
    private readonly getProductItemExpireStateRuleByIdUsecase: GetProductItemExpireStateRuleByIdUsecase,
  ) {}
  async execute(
    id: number,
    stateName: string,
    val: number,
    color: string,
  ): Promise<ProductItemExpireStateRuleEntity> {
    const existingRule =
      await this.getProductItemExpireStateRuleByIdUsecase.execute(id);

    existingRule.stateName = stateName;
    existingRule.val = val;
    existingRule.color = color;

    const errors = await existingRule.validateData();
    if (errors && errors.length > 0) {
      throw new CoreException.ValidationException('invalid data', errors);
    }

    const existingRules =
      await this.getProductItemExpireStateRulesUsecase.execute();

    existingRules.forEach((rule) => {
      if (rule.id !== existingRule.id) {
        if (rule.val == existingRule.val) {
          throw new CoreException.ConflictException('Rule is invalid');
        }
      }
    });

    const updated =
      this.productItemExpireStateRuleRepository.updateProductItemExpireStateRule(
        existingRule,
      );
    return updated;
  }
}

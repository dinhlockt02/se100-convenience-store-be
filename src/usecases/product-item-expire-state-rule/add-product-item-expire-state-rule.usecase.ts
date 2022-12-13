import { Inject, Injectable } from '@nestjs/common';
import { ProductItemExpireStateRuleEntity } from 'src/core/entities/product-item-expire-state-rule.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemExpireStateRuleRepository,
  IProductItemExpireStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-expire-state-rule.repository';
import { GetProductItemExpireStateRulesUsecase } from './get-product-item-expire-state-rules.usecase';

@Injectable()
export class AddProductItemExpireStateRuleUsecase {
  constructor(
    @Inject(IProductItemExpireStateRuleRepositoryLabel)
    private readonly productItemExpireStateRuleRepository: IProductItemExpireStateRuleRepository,
    private readonly getProductItemExpireStateRulesUsecase: GetProductItemExpireStateRulesUsecase,
  ) {}
  async execute(
    stateName: string,
    val: number,
    color: string,
  ): Promise<ProductItemExpireStateRuleEntity> {
    const newRule = new ProductItemExpireStateRuleEntity(
      0,
      stateName,
      val,
      color,
    );
    const errors = await newRule.validateData();
    if (errors && errors.length > 0) {
      throw new CoreException.ValidationException('invalid data', errors);
    }

    const existingRules =
      await this.getProductItemExpireStateRulesUsecase.execute();

    existingRules.forEach((rule) => {
      if (rule.val == newRule.val) {
        throw new CoreException.ConflictException('Rule is invalid');
      }
    });

    const createdRule =
      this.productItemExpireStateRuleRepository.addProductItemExpireStateRule(
        newRule,
      );
    return createdRule;
  }
}

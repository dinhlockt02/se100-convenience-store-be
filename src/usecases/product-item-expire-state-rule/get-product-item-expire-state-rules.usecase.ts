import { Inject, Injectable } from '@nestjs/common';
import { ProductItemExpireStateRuleEntity } from 'src/core/entities/product-item-expire-state-rule.entity';
import {
  IProductItemExpireStateRuleRepository,
  IProductItemExpireStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-expire-state-rule.repository';

@Injectable()
export class GetProductItemExpireStateRulesUsecase {
  constructor(
    @Inject(IProductItemExpireStateRuleRepositoryLabel)
    private readonly productItemExpireStateRuleRepository: IProductItemExpireStateRuleRepository,
  ) {}
  async execute(): Promise<ProductItemExpireStateRuleEntity[]> {
    return this.productItemExpireStateRuleRepository.getProductItemExpireStateRules();
  }
}

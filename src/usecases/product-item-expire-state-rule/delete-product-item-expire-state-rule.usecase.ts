import { Inject, Injectable } from '@nestjs/common';
import {
  IProductItemExpireStateRuleRepository,
  IProductItemExpireStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-expire-state-rule.repository';
import { GetProductItemExpireStateRuleByIdUsecase } from './get-product-item-expire-state-rule-by-id.usecase';

@Injectable()
export class DeleteProductItemExpireStateRuleByIdUsecase {
  constructor(
    @Inject(IProductItemExpireStateRuleRepositoryLabel)
    private readonly productItemExpireStateRuleRepository: IProductItemExpireStateRuleRepository,
    private readonly getProductItemExpireStateRuleUsecase: GetProductItemExpireStateRuleByIdUsecase,
  ) {}
  async execute(id: number) {
    await this.getProductItemExpireStateRuleUsecase.execute(id);
    await this.productItemExpireStateRuleRepository.deleteProductItemExpireStateRule(
      id,
    );
  }
}

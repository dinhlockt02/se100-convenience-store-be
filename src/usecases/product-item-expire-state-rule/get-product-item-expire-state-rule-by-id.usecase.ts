import { Inject, Injectable } from '@nestjs/common';
import { ProductItemExpireStateRuleEntity } from 'src/core/entities/product-item-expire-state-rule.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemExpireStateRuleRepository,
  IProductItemExpireStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-expire-state-rule.repository';

@Injectable()
export class GetProductItemExpireStateRuleByIdUsecase {
  constructor(
    @Inject(IProductItemExpireStateRuleRepositoryLabel)
    private readonly productItemExpireStateRuleRepository: IProductItemExpireStateRuleRepository,
  ) {}
  async execute(id: number): Promise<ProductItemExpireStateRuleEntity> {
    const rule =
      await this.productItemExpireStateRuleRepository.getProductItemExpireStateRuleById(
        id,
      );
    if (!rule) {
      throw new CoreException.NotFoundException('Rule not found');
    }
    return rule;
  }
}

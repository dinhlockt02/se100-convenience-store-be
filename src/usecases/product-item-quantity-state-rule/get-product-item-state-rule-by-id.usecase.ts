import { Inject, Injectable } from '@nestjs/common';
import { ProductItemQuantityStateRuleEntity } from 'src/core/entities/product-item-quantity-state-rule.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemQuantityStateRuleRepository,
  IProductItemQuantityStateRuleRepositoryLabel,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';

@Injectable()
export class GetProductItemQuantityStateRuleByIdUsecase {
  constructor(
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
  ) {}
  async execute(id: number): Promise<ProductItemQuantityStateRuleEntity> {
    const rule =
      await this.productItemQuantityStateRuleRepository.getProductItemQuantityStateRuleById(
        id,
      );
    if (!rule) {
      throw new CoreException.NotFoundException('Rule not found');
    }
    return rule;
  }
}

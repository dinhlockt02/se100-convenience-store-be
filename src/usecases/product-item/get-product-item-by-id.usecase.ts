import { Inject, Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import {
  IProductItemQuantityStateRuleRepositoryLabel,
  IProductItemQuantityStateRuleRepository,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';
import {
  IProductItemRepositoryLabel,
  IProductItemRepository,
} from 'src/core/repositories/product-item.repository.interface';

@Injectable()
export class GetProductItemByIdUsecase {
  constructor(
    @Inject(IProductItemRepositoryLabel)
    private readonly productItemRepository: IProductItemRepository,
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
  ) {}
  async execute(id: string): Promise<ProductItemEntity> {
    const productItem = await this.productItemRepository.getProductItemById(id);
    return (
      await this.productItemQuantityStateRuleRepository.updateState([
        productItem,
      ])
    )[0];
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemExpireStateRuleRepositoryLabel,
  IProductItemExpireStateRuleRepository,
} from 'src/core/repositories/product-item-expire-state-rule.repository';
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
    @Inject(IProductItemExpireStateRuleRepositoryLabel)
    private readonly produxtItemExpireStateRuleRepository: IProductItemExpireStateRuleRepository,
  ) {}
  async execute(id: string): Promise<ProductItemEntity> {
    let productItem = await this.productItemRepository.getProductItemById(id);
    if (!productItem) {
      throw new CoreException.NotFoundException('product item not found');
    }

    [productItem] =
      await this.productItemQuantityStateRuleRepository.updateState([
        productItem,
      ]);

    [productItem] = await this.produxtItemExpireStateRuleRepository.updateState(
      [productItem],
    );
    return productItem;
  }
}

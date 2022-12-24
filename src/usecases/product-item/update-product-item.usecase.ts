import { Inject, Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemQuantityStateRuleRepositoryLabel,
  IProductItemQuantityStateRuleRepository,
} from 'src/core/repositories/product-item-quantity-state-rule.repository';
import {
  IProductItemRepository,
  IProductItemRepositoryLabel,
} from 'src/core/repositories/product-item.repository.interface';
import { GetDeliveryNoteByIdUsecase } from '../delivery-note/get-delivery-note-by-id.usecase';
import { GetProductByIdUsecase } from '../product/get-product-by-id.usecase';
import { GetProductItemByIdUsecase } from './get-product-item-by-id.usecase';

@Injectable()
export class UpdateProductItemUsecase {
  constructor(
    @Inject(IProductItemRepositoryLabel)
    private readonly productItemRepository: IProductItemRepository,
    private readonly getProductItemByIdUsecase: GetProductItemByIdUsecase,
    @Inject(IProductItemQuantityStateRuleRepositoryLabel)
    private readonly productItemQuantityStateRuleRepository: IProductItemQuantityStateRuleRepository,
  ) {}
  async execute(id: string, price: number, description: string, image: string) {
    const productItem = await this.getProductItemByIdUsecase.execute(id);
    productItem.price = price;
    productItem.description = description;
    productItem.image = image;
    const updatedProductItem =
      await this.productItemRepository.updateProductItem(productItem);
    const rs = await this.productItemQuantityStateRuleRepository.updateState([
      updatedProductItem,
    ]);

    return rs[0];
  }
}

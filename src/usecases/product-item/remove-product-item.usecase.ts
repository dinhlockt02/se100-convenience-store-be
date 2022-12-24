import { Injectable, Inject } from '@nestjs/common';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemRepositoryLabel,
  IProductItemRepository,
} from 'src/core/repositories/product-item.repository.interface';

@Injectable()
export class RemoveProductItemUsecase {
  constructor(
    @Inject(IProductItemRepositoryLabel)
    private readonly productItemRepository: IProductItemRepository,
  ) {}
  async execute(productItemId: string) {
    await this.productItemRepository.deleteProductItem(productItemId);
  }
}

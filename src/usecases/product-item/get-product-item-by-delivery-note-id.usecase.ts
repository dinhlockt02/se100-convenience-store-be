import { Inject, Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import {
  IProductItemRepositoryLabel,
  IProductItemRepository,
} from 'src/core/repositories/product-item.repository.interface';

@Injectable()
export class GetProductItemByDeliveryNoteUsecase {
  constructor(
    @Inject(IProductItemRepositoryLabel)
    private readonly productItemRepository: IProductItemRepository,
  ) {}
  async execute(deliveryNoteId: number): Promise<ProductItemEntity[]> {
    return this.productItemRepository.getProductItemByDeliveryNote(
      deliveryNoteId,
    );
  }
}

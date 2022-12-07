import { ProductItemEntity } from '../entities/product-item.entity';

export interface IProductItemRepository {
  createProductItem(productItem: ProductItemEntity): Promise<ProductItemEntity>;
  deleteProductItem(productItemId: string);
  getProductItemByDeliveryNote(
    deliveryNoteId: number,
  ): Promise<ProductItemEntity[]>;

  getProductItemById(id: string): Promise<ProductItemEntity>;
}

export const IProductItemRepositoryLabel = 'IProductItemRepositoryLabel';

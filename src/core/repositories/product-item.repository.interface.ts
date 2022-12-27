import { ProductItemEntity } from '../entities/product-item.entity';

export interface IProductItemRepository {
  createProductItem(productItem: ProductItemEntity): Promise<ProductItemEntity>;
  updateProductItem(productItem: ProductItemEntity): Promise<ProductItemEntity>;
  deleteProductItem(productItemId: string);
  getProductItemByDeliveryNote(
    deliveryNoteId: string,
  ): Promise<ProductItemEntity[]>;

  getProductItemById(id: string): Promise<ProductItemEntity>;
  getProductItems(): Promise<ProductItemEntity[]>;
}

export const IProductItemRepositoryLabel = 'IProductItemRepositoryLabel';

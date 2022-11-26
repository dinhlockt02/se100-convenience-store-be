import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  updateProduct(product: ProductEntity): Promise<ProductEntity>;
  deleteProduct(id: string);
  getProductById(id: string): Promise<ProductEntity>;
  createProduct(product: ProductEntity): Promise<ProductEntity>;
  getProducts(): Promise<ProductEntity[]>;
}

export const IProductRepositoryLabel = 'IProductRepositoryLabel';

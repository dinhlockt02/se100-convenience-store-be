import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  getProductById(id: number): Promise<ProductEntity>;
  createProduct(ProductEntity: ProductEntity): Promise<ProductEntity>;
  getProduct(): Promise<ProductEntity[]>;
  updateProduct(updatedUser: ProductEntity): Promise<ProductEntity>;
  deleteProduct(id: number): Promise<void>;
}

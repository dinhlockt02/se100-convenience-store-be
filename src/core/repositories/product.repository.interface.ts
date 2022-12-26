import { ProductEntity } from '../entities/product.entity';
import { ProviderEntity } from '../entities/provider.entity';

export interface IProductRepository {
  updateProduct(product: ProductEntity): Promise<ProductEntity>;
  deleteProduct(id: number);
  getProductById(id: number): Promise<ProductEntity>;
  createProduct(product: ProductEntity): Promise<ProductEntity>;
  getProducts(): Promise<ProductEntity[]>;
  addProvider(
    providerId: number[],
    productId: number,
  ): Promise<ProviderEntity[]>;
  getProviders(productId: string): Promise<ProviderEntity[]>;
  removeProvider(
    providerId: number[],
    productId: number,
  ): Promise<ProviderEntity[]>;
}

export const IProductRepositoryLabel = 'IProductRepositoryLabel';

import { ProductEntity } from '../entities/product.entity';
import { ProviderEntity } from '../entities/provider.entity';

export interface IProductRepository {
  updateProduct(product: ProductEntity): Promise<ProductEntity>;
  deleteProduct(id: string);
  getProductById(id: string): Promise<ProductEntity>;
  createProduct(product: ProductEntity): Promise<ProductEntity>;
  getProducts(): Promise<ProductEntity[]>;
  addProvider(
    providerId: number[],
    productId: string,
  ): Promise<ProviderEntity[]>;
  getProviders(productId: string): Promise<ProviderEntity[]>;
  removeProvider(
    providerId: number[],
    productId: string,
  ): Promise<ProviderEntity[]>;
}

export const IProductRepositoryLabel = 'IProductRepositoryLabel';

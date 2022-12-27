import { ProductEntity } from '../entities/product.entity';
import { ProviderEntity } from '../entities/provider.entity';

export interface IProviderRepository {
  createProvider(provider: ProviderEntity): Promise<ProviderEntity>;
  getProviders(): Promise<ProviderEntity[]>;
  getProvider(id: number): Promise<ProviderEntity>;
  updateProvider(provider: ProviderEntity): Promise<ProviderEntity>;
  deleteProvider(id: number);
  addProduct(providerId: number, productId: number[]): Promise<ProductEntity[]>;
  getProducts(providerId: number): Promise<ProductEntity[]>;
  removeProduct(
    providerId: number,
    productId: number[],
  ): Promise<ProductEntity[]>;
}

export const IProviderRepositoryLabel = 'IProviderRepositoryLabel';

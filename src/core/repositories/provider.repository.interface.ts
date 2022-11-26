import { ProviderEntity } from '../entities/provider.entity';

export interface IProviderRepository {
  createProvider(provider: ProviderEntity): Promise<ProviderEntity>;
  getProviders(): Promise<ProviderEntity[]>;
  getProvider(id: number): Promise<ProviderEntity>;
  updateProvider(provider: ProviderEntity): Promise<ProviderEntity>;
  deleteProvider(id: number);
}

export const IProviderRepositoryLabel = 'IProviderRepositoryLabel';

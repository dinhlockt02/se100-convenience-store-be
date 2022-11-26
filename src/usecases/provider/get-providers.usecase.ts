import { Inject, Injectable } from '@nestjs/common';
import { ProviderEntity } from 'src/core/entities/provider.entity';
import {
  IProviderRepository,
  IProviderRepositoryLabel,
} from 'src/core/repositories/provider.repository.interface';

@Injectable()
export class GetProvidersUsecase {
  constructor(
    @Inject(IProviderRepositoryLabel)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(): Promise<ProviderEntity[]> {
    const providerEntities = await this.providerRepository.getProviders();
    return providerEntities;
  }
}

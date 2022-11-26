import { Inject, Injectable } from '@nestjs/common';
import { ProviderEntity } from 'src/core/entities/provider.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProviderRepository,
  IProviderRepositoryLabel,
} from 'src/core/repositories/provider.repository.interface';

@Injectable()
export class GetProviderByIdUsecase {
  constructor(
    @Inject(IProviderRepositoryLabel)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(id: number): Promise<ProviderEntity> {
    const providerEntity = await this.providerRepository.getProvider(id);
    if (!providerEntity) {
      throw new CoreException.NotFoundException('provider not found');
    }
    return providerEntity;
  }
}

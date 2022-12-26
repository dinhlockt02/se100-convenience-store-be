import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/core/entities/product.entity';

import {
  IProviderRepository,
  IProviderRepositoryLabel,
} from 'src/core/repositories/provider.repository.interface';

@Injectable()
export class RemoveProductFromProviderUsecase {
  constructor(
    @Inject(IProviderRepositoryLabel)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(
    providerId: number,
    productId: number[],
  ): Promise<ProductEntity[]> {
    return await this.providerRepository.removeProduct(providerId, productId);
  }
}

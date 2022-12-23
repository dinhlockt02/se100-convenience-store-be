import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/core/entities/product.entity';
import { ProviderEntity } from 'src/core/entities/provider.entity';
import {
  IProductRepository,
  IProductRepositoryLabel,
} from 'src/core/repositories/product.repository.interface';

@Injectable()
export class RemoveProviderFromProductUsecase {
  constructor(
    @Inject(IProductRepositoryLabel)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(
    providerId: number,
    productId: string,
  ): Promise<ProviderEntity[]> {
    return await this.productRepository.removeProvider(providerId, productId);
  }
}

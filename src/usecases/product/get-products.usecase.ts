import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/core/entities/product.entity';
import {
  IProductRepository,
  IProductRepositoryLabel,
} from 'src/core/repositories/product.repository.interface';

@Injectable()
export class GetProductsUsecase {
  constructor(
    @Inject(IProductRepositoryLabel)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.getProducts();
  }
}

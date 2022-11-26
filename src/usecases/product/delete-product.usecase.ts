import { Inject, Injectable } from '@nestjs/common';
import {
  IProductRepository,
  IProductRepositoryLabel,
} from 'src/core/repositories/product.repository.interface';
import { GetProductByIdUsecase } from './get-product-by-id.usecase';

@Injectable()
export class DeleteProductUsecase {
  constructor(
    @Inject(IProductRepositoryLabel)
    private readonly productRepository: IProductRepository,
    private readonly getProductByIdUsecase: GetProductByIdUsecase,
  ) {}

  async execute(id: string) {
    await this.getProductByIdUsecase.execute(id);
    await this.productRepository.deleteProduct(id);
  }
}

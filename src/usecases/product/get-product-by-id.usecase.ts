import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/core/entities/product.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductRepository,
  IProductRepositoryLabel,
} from 'src/core/repositories/product.repository.interface';

@Injectable()
export class GetProductByIdUsecase {
  constructor(
    @Inject(IProductRepositoryLabel)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new CoreException.NotFoundException('product not found');
    }
    return product;
  }
}

import { IProductRepository } from 'src/core/repositories/product.repository.interface';

export class GetProductsUsecase {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute() {
    return this.productRepository.getProduct();
  }
}

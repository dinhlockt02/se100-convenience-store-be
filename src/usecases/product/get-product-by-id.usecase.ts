import { NotFoundException } from 'src/core/exceptions';
import { IProductRepository } from 'src/core/repositories/product.repository.interface';

export class GetProductbyIdUsecase {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute(id: number) {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}

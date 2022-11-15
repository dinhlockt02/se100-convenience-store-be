import { IProductRepository } from 'src/core/repositories/product.repository.interface';

export class DeleteProductByIdUsecase {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute(id: number) {
    return this.productRepository.deleteProduct(id);
  }
}

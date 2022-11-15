import { ProductEntity } from 'src/core/entities/product.entity';
import { ValidationException } from 'src/core/exceptions';
import { IProductRepository } from 'src/core/repositories/product.repository.interface';

export class CreateProductUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(productEntity: ProductEntity): Promise<ProductEntity> {
    const validationErrors = await productEntity.validateData();
    if (validationErrors.length > 0) {
      throw new ValidationException('Validation failed', validationErrors);
    }
    const createdProductEntity = await this.productRepository.createProduct(
      productEntity,
    );
    return createdProductEntity;
  }
}

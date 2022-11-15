import { ProductEntity } from 'src/core/entities/product.entity';
import { NotFoundException, ValidationException } from 'src/core/exceptions';
import { IProductRepository } from 'src/core/repositories/product.repository.interface';

export class UpdateProductUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(productEntity: ProductEntity): Promise<ProductEntity> {
    const existingProduct = await this.productRepository.getProductById(
      productEntity.id,
    );
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    const validationErrors = await productEntity.validateData();

    if (validationErrors.length > 0) {
      throw new ValidationException('Validation failed', validationErrors);
    }

    existingProduct.name = productEntity.name;
    existingProduct.price = productEntity.price;
    existingProduct.cost = productEntity.cost;
    existingProduct.vat = productEntity.vat;
    existingProduct.amount = productEntity.amount;
    existingProduct.description = productEntity.description;
    existingProduct.image = productEntity.image;
    existingProduct.expireDate = productEntity.expireDate;

    const updatedProduct = await this.productRepository.updateProduct(
      existingProduct,
    );
    return updatedProduct;
  }
}

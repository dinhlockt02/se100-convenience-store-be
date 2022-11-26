import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/core/entities/product.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductRepository,
  IProductRepositoryLabel,
} from 'src/core/repositories/product.repository.interface';

@Injectable()
export class CreateProductUsecase {
  constructor(
    @Inject(IProductRepositoryLabel)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(title: string, tax: number): Promise<ProductEntity> {
    const product = new ProductEntity('', title, tax);

    const validationErrors = await product.validateData();
    if (validationErrors && validationErrors.length > 0) {
      throw new CoreException.ValidationException(
        'Invalid data',
        validationErrors,
      );
    }

    const newProductEntity = await this.productRepository.createProduct(
      product,
    );
    return newProductEntity;
  }
}

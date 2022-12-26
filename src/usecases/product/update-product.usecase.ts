import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/core/entities/product.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductRepository,
  IProductRepositoryLabel,
} from 'src/core/repositories/product.repository.interface';
import { GetProductByIdUsecase } from './get-product-by-id.usecase';

@Injectable()
export class UpdateProductUsecase {
  constructor(
    @Inject(IProductRepositoryLabel)
    private readonly productRepository: IProductRepository,
    private readonly getProductByIdUsecase: GetProductByIdUsecase,
  ) {}

  async execute(
    id: number,
    title: string,
    tax: number,
  ): Promise<ProductEntity> {
    const product = await this.getProductByIdUsecase.execute(id);

    const updateProduct = product.copyWith(title, tax);

    const validationErrors = await product.validateData();
    if (validationErrors && validationErrors.length > 0) {
      throw new CoreException.ValidationException(
        'Invalid data',
        validationErrors,
      );
    }

    const updatedProduct = await this.productRepository.updateProduct(
      updateProduct,
    );
    return updatedProduct;
  }
}

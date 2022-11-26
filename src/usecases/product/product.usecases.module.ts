import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { CreateProductUsecase } from './create-product.usecase';
import { DeleteProductUsecase } from './delete-product.usecase';
import { GetProductByIdUsecase } from './get-product-by-id.usecase';
import { GetProductsUsecase } from './get-products.usecase';
import { UpdateProductUsecase } from './update-product.usecase';
@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    CreateProductUsecase,
    GetProductByIdUsecase,
    GetProductsUsecase,
    UpdateProductUsecase,
    DeleteProductUsecase,
  ],
  exports: [
    CreateProductUsecase,
    GetProductByIdUsecase,
    GetProductsUsecase,
    UpdateProductUsecase,
    DeleteProductUsecase,
  ],
})
export class ProductUsecasesModule {}

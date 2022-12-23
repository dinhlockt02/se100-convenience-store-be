import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { AddProviderToProductUsecase } from './add-provider-to-product.usecase';
import { CreateProductUsecase } from './create-product.usecase';
import { DeleteProductUsecase } from './delete-product.usecase';
import { GetProductByIdUsecase } from './get-product-by-id.usecase';
import { GetProductsUsecase } from './get-products.usecase';
import { GetProvidersByProductIdUsecase } from './get-providers-by-product-id.usecase';
import { RemoveProviderFromProductUsecase } from './remove-provider-from-product.usecase';
import { UpdateProductUsecase } from './update-product.usecase';
@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    CreateProductUsecase,
    GetProductByIdUsecase,
    GetProductsUsecase,
    UpdateProductUsecase,
    DeleteProductUsecase,
    AddProviderToProductUsecase,
    RemoveProviderFromProductUsecase,
    GetProvidersByProductIdUsecase,
  ],
  exports: [
    CreateProductUsecase,
    GetProductByIdUsecase,
    GetProductsUsecase,
    UpdateProductUsecase,
    DeleteProductUsecase,
    AddProviderToProductUsecase,
    RemoveProviderFromProductUsecase,
    GetProvidersByProductIdUsecase,
  ],
})
export class ProductUsecasesModule {}

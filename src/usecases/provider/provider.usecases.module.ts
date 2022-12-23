import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { AddProductToProviderUsecase } from './add-product-to-provider.usecase';
import { CreateProviderUsecase } from './create-provider.usecase';
import { DeleteProviderUsecase } from './delete-provider.usecase';
import { GetProductByProviderIdUsecase } from './get-products-by-provider-id.usecase';
import { GetProviderByIdUsecase } from './get-provider-by-id.usecase';
import { GetProvidersUsecase } from './get-providers.usecase';
import { RemoveProductFromProviderUsecase } from './remove-product-from-provider.usecase';
import { UpdateProviderUsecase } from './update-provider.usecase';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    CreateProviderUsecase,
    DeleteProviderUsecase,
    GetProviderByIdUsecase,
    GetProvidersUsecase,
    UpdateProviderUsecase,
    AddProductToProviderUsecase,
    RemoveProductFromProviderUsecase,
    GetProductByProviderIdUsecase,
  ],
  exports: [
    CreateProviderUsecase,
    DeleteProviderUsecase,
    GetProviderByIdUsecase,
    GetProvidersUsecase,
    UpdateProviderUsecase,
    AddProductToProviderUsecase,
    GetProductByProviderIdUsecase,
    RemoveProductFromProviderUsecase,
  ],
})
export class ProviderUsecasesModule {}

import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { CreateProviderUsecase } from './create-provider.usecase';
import { DeleteProviderUsecase } from './delete-provider.usecase';
import { GetProviderByIdUsecase } from './get-provider-by-id.usecase';
import { GetProvidersUsecase } from './get-providers.usecase';
import { UpdateProviderUsecase } from './update-provider.usecase';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    CreateProviderUsecase,
    DeleteProviderUsecase,
    GetProviderByIdUsecase,
    GetProvidersUsecase,
    UpdateProviderUsecase,
  ],
  exports: [
    CreateProviderUsecase,
    DeleteProviderUsecase,
    GetProviderByIdUsecase,
    GetProvidersUsecase,
    UpdateProviderUsecase,
  ],
})
export class ProviderUsecasesModule {}

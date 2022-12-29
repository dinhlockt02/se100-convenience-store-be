import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { GetVATUsecase } from './get-vat.usecase';
import { UpdateVATUsecase } from './update-vat.usecase';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [GetVATUsecase, UpdateVATUsecase],
  exports: [GetVATUsecase, UpdateVATUsecase],
})
export class VATUsecasesModule {}

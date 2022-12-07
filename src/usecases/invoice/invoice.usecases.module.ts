import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ProductItemUsecasesModule } from '../product-item/product-item.usecases.module';
import { UserUsecasesModule } from '../user/user.usecases.module';
import { CreateInvoiceUsecase } from './create-invoice.usecase';
import { GetInvoiceByIdUsecase } from './get-invoice-by-id.usecase';
import { GetInvoicesUsecase } from './get-invoice.usecase';

@Module({
  imports: [RepositoriesModule, UserUsecasesModule, ProductItemUsecasesModule],
  providers: [CreateInvoiceUsecase, GetInvoiceByIdUsecase, GetInvoicesUsecase],
  exports: [CreateInvoiceUsecase, GetInvoiceByIdUsecase, GetInvoicesUsecase],
})
export class InvoiceUsecasesModule {}

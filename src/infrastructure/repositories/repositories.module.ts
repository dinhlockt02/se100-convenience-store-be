import { Module } from '@nestjs/common';
import { IDeliveryNoteRepositoryLabel } from 'src/core/repositories/delivery-note.repository.interface';
import { IInvoiceRepositoryLabel } from 'src/core/repositories/invoice.repository.interface';
import { IProductItemExpireStateRuleRepositoryLabel } from 'src/core/repositories/product-item-expire-state-rule.repository';
import { IProductItemQuantityStateRuleRepositoryLabel } from 'src/core/repositories/product-item-quantity-state-rule.repository';
import { IProductItemRepositoryLabel } from 'src/core/repositories/product-item.repository.interface';
import { IProductRepositoryLabel } from 'src/core/repositories/product.repository.interface';
import { IProviderRepositoryLabel } from 'src/core/repositories/provider.repository.interface';
import { IReportRepositoryLabel } from 'src/core/repositories/report.repository.interface';
import { IResetPasswordTokenRepositoryLabel } from 'src/core/repositories/reset-password-token.repository.interface';
import { IUserRepositoryLabel } from 'src/core/repositories/user.repository.interface';
import { ServicesModule } from '../services/services.module';
import { DeliveryNoteRepository } from './prisma/delivery-note.repository';
import { InvoiceRepository } from './prisma/invoice.repository';
import { ProductItemExpireStateRuleRepository } from './prisma/product-item-expire-state-rule.repository';
import { ProductItemQuantityStateRuleRepository } from './prisma/product-item-quantity-state-rule.repository';
import { ProductItemRepository } from './prisma/product-item.repository';
import { ProductRepository } from './prisma/product.repository';
import { ProviderRepository } from './prisma/provider.repository';
import { ReportRepository } from './prisma/report.repository';
import { ResetPasswordTokenRepository } from './prisma/reset-password-token.repository';
import { UserRepository } from './prisma/user.repository';

@Module({
  imports: [ServicesModule],
  providers: [
    {
      provide: IUserRepositoryLabel,
      useClass: UserRepository,
    },
    {
      provide: IResetPasswordTokenRepositoryLabel,
      useClass: ResetPasswordTokenRepository,
    },
    {
      provide: IProviderRepositoryLabel,
      useClass: ProviderRepository,
    },
    {
      provide: IProductRepositoryLabel,
      useClass: ProductRepository,
    },
    {
      provide: IDeliveryNoteRepositoryLabel,
      useClass: DeliveryNoteRepository,
    },
    {
      provide: IProductItemRepositoryLabel,
      useClass: ProductItemRepository,
    },
    {
      provide: IProductItemQuantityStateRuleRepositoryLabel,
      useClass: ProductItemQuantityStateRuleRepository,
    },
    {
      provide: IInvoiceRepositoryLabel,
      useClass: InvoiceRepository,
    },
    {
      provide: IProductItemExpireStateRuleRepositoryLabel,
      useClass: ProductItemExpireStateRuleRepository,
    },
    {
      provide: IReportRepositoryLabel,
      useClass: ReportRepository,
    },
  ],
  exports: [
    {
      provide: IUserRepositoryLabel,
      useClass: UserRepository,
    },
    {
      provide: IResetPasswordTokenRepositoryLabel,
      useClass: ResetPasswordTokenRepository,
    },
    {
      provide: IProviderRepositoryLabel,
      useClass: ProviderRepository,
    },
    {
      provide: IProductRepositoryLabel,
      useClass: ProductRepository,
    },
    {
      provide: IDeliveryNoteRepositoryLabel,
      useClass: DeliveryNoteRepository,
    },
    {
      provide: IProductItemRepositoryLabel,
      useClass: ProductItemRepository,
    },
    {
      provide: IProductItemQuantityStateRuleRepositoryLabel,
      useClass: ProductItemQuantityStateRuleRepository,
    },
    {
      provide: IInvoiceRepositoryLabel,
      useClass: InvoiceRepository,
    },
    {
      provide: IProductItemExpireStateRuleRepositoryLabel,
      useClass: ProductItemExpireStateRuleRepository,
    },
    {
      provide: IReportRepositoryLabel,
      useClass: ReportRepository,
    },
  ],
})
export class RepositoriesModule {}

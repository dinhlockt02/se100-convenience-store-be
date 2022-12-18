import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthUsecasesModule } from 'src/usecases/auth/auth.usecases.module';
import { DeliveryNoteUsecasesModule } from 'src/usecases/delivery-note/delivery-note.usecases.module';
import { InvoiceUsecasesModule } from 'src/usecases/invoice/invoice.usecases.module';
import { GetProductItemExpireStateRulesUsecase } from 'src/usecases/product-item-expire-state-rule/get-product-item-expire-state-rules.usecase';
import { ProductItemExpireStateRuleUsecasesModule } from 'src/usecases/product-item-expire-state-rule/product-item-expire-state-rule.usecases.module';
import { ProductItemQuantityStateRuleUsecasesModule } from 'src/usecases/product-item-quantity-state-rule/product-item-quantity-state-rule.usecases.module';
import { ProductItemUsecasesModule } from 'src/usecases/product-item/product-item.usecases.module';
import { ProductUsecasesModule } from 'src/usecases/product/product.usecases.module';
import { ProviderUsecasesModule } from 'src/usecases/provider/provider.usecases.module';
import { ReportUsecasesModule } from 'src/usecases/report/report.usecases.module';
import { UserUsecasesModule } from 'src/usecases/user/user.usecases.module';
import { LocalStrategy } from '../common/strategies/local.strategy';
import { AuthController } from './auth/auth.controller';
import { DeliveryNoteController } from './delivery-note/delivery-note.controller';
import { ImageController } from './image/image.controller';
import { InvoiceController } from './invoice/invoice.controller';
import { ProductItemExpireStateRuleController } from './product-item-expire-state-rule/product-item-expire-state.controller';
import { ProductItemQuantityStateRuleController } from './product-item-quantity-state-rule/product-item-quantity-state.controller';
import { ProductItemController } from './product-item/product-item.controller';
import { ProductController } from './product/product.controller';
import { ProviderController } from './provider/provider.controller';
import { ReportController } from './report/report.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    PassportModule,
    AuthUsecasesModule,
    UserUsecasesModule,
    ProviderUsecasesModule,
    ProductUsecasesModule,
    DeliveryNoteUsecasesModule,
    ProductItemUsecasesModule,
    ProductItemQuantityStateRuleUsecasesModule,
    InvoiceUsecasesModule,
    ProductItemExpireStateRuleUsecasesModule,
    ReportUsecasesModule,
  ],
  controllers: [
    UserController,
    AuthController,
    ImageController,
    ProviderController,
    ProductController,
    DeliveryNoteController,
    ProductItemController,
    ProductItemQuantityStateRuleController,
    InvoiceController,
    ProductItemExpireStateRuleController,
    ReportController,
  ],
  providers: [LocalStrategy],
})
export class ControllersModule {}

import { forwardRef, Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { DeliveryNoteUsecasesModule } from '../delivery-note/delivery-note.usecases.module';
import { ProductUsecasesModule } from '../product/product.usecases.module';
import { AddProductItemUsecase } from './add-product-item.usecase';
import { GetProductItemByDeliveryNoteUsecase } from './get-product-item-by-delivery-note-id.usecase';
import { RemoveProductItemUsecase } from './remove-product-item.usecase';

@Module({
  imports: [
    RepositoriesModule,
    ServicesModule,
    ProductUsecasesModule,
    forwardRef(() => DeliveryNoteUsecasesModule),
  ],
  providers: [
    AddProductItemUsecase,
    RemoveProductItemUsecase,
    GetProductItemByDeliveryNoteUsecase,
  ],
  exports: [
    AddProductItemUsecase,
    RemoveProductItemUsecase,
    GetProductItemByDeliveryNoteUsecase,
  ],
})
export class ProductItemUsecasesModule {}

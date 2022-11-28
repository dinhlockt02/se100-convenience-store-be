import { forwardRef, Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ServicesModule } from 'src/infrastructure/services/services.module';
import { ProductItemUsecasesModule } from '../product-item/product-item.usecases.module';
import { ProviderUsecasesModule } from '../provider/provider.usecases.module';
import { CreateDeliveryNoteUsecase } from './create-delivery-note.usecase';
import { DeleteDeliveryNoteUsecase } from './delete-delivery-note.usecase';
import { GetDeliveryNoteByIdUsecase } from './get-delivery-note-by-id.usecase';
import { GetDeliveryNotesUsecase } from './get-delivery-notes.usecase';

@Module({
  imports: [
    RepositoriesModule,
    ServicesModule,
    ProviderUsecasesModule,
    forwardRef(() => ProductItemUsecasesModule),
  ],
  providers: [
    CreateDeliveryNoteUsecase,
    GetDeliveryNoteByIdUsecase,
    GetDeliveryNotesUsecase,
    DeleteDeliveryNoteUsecase,
  ],
  exports: [
    CreateDeliveryNoteUsecase,
    GetDeliveryNoteByIdUsecase,
    GetDeliveryNotesUsecase,
    DeleteDeliveryNoteUsecase,
  ],
})
export class DeliveryNoteUsecasesModule {}

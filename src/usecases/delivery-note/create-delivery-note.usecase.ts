import { Inject, Injectable } from '@nestjs/common';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { CoreException } from 'src/core/exceptions';
import {
  CreateProductItemDto,
  IDeliveryNoteRepository,
  IDeliveryNoteRepositoryLabel,
} from 'src/core/repositories/delivery-note.repository.interface';
import { GetProductItemByDeliveryNoteUsecase } from '../product-item/get-product-item-by-delivery-note-id.usecase';
import { GetProviderByIdUsecase } from '../provider/get-provider-by-id.usecase';
import { GetUserByIdUsecase } from '../user/get-users-by-id.usecase';

@Injectable()
export class CreateDeliveryNoteUsecase {
  constructor(
    @Inject(IDeliveryNoteRepositoryLabel)
    private readonly deliveryNoteRepository: IDeliveryNoteRepository,
    private readonly getProviderByIdUsecase: GetProviderByIdUsecase,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
    private readonly getProductItemByDeliveryNoteUsecase: GetProductItemByDeliveryNoteUsecase,
  ) {}
  async execute(
    providerId: number,
    date: Date,
    creatorId: number,
    shipper: string,
    createProductItemDtos: CreateProductItemDto[],
  ): Promise<DeliveryNoteEntity> {
    const provider = await this.getProviderByIdUsecase.execute(providerId);
    const creator = await this.getUserByIdUsecase.execute(creatorId);
    const deliveryNote = new DeliveryNoteEntity(
      null,
      0,
      provider,
      date,
      creator,
      shipper,
      0,
    );
    const errors = await deliveryNote.validateData();
    if (errors && errors.length > 0) {
      throw new CoreException.ValidationException('Invalid data', errors);
    }
    const createdDeliveryNote =
      await this.deliveryNoteRepository.createDeliveryNote(
        deliveryNote,
        createProductItemDtos,
      );

    createdDeliveryNote.productItems =
      await this.getProductItemByDeliveryNoteUsecase.execute(
        createdDeliveryNote.id,
      );

    return createdDeliveryNote;
  }
}

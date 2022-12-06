import { Inject, Injectable } from '@nestjs/common';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProductItemRepository,
  IProductItemRepositoryLabel,
} from 'src/core/repositories/product-item.repository.interface';
import { GetDeliveryNoteByIdUsecase } from '../delivery-note/get-delivery-note-by-id.usecase';
import { GetProductByIdUsecase } from '../product/get-product-by-id.usecase';

@Injectable()
export class AddProductItemUsecase {
  constructor(
    @Inject(IProductItemRepositoryLabel)
    private readonly productItemRepository: IProductItemRepository,
    private readonly getProductByIdUsecase: GetProductByIdUsecase,
    private readonly getDeliveryNoteByIdUsecase: GetDeliveryNoteByIdUsecase,
  ) {}
  async execute(
    productId: string,
    deliveryNoteId: number,
    MFG: Date,
    EXP: Date,
    cost: number,
    price: number,
    quantity: number,
    description: string,
    image: string,
  ) {
    const product = await this.getProductByIdUsecase.execute(productId);
    const deliveryNote = await this.getDeliveryNoteByIdUsecase.execute(
      deliveryNoteId,
    );
    const productItem = new ProductItemEntity(
      '',
      product,
      deliveryNote,
      MFG,
      EXP,
      cost,
      price,
      quantity,
      quantity,
      description,
      image,
      [],
    );
    const errors = await productItem.validateData();
    if (errors && errors.length > 0) {
      throw new CoreException.ValidationException('invalid data', errors);
    }
    const createdProductItem =
      await this.productItemRepository.createProductItem(productItem);
    return createdProductItem;
  }
}

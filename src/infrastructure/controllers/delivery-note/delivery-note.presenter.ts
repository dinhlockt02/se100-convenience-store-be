import { ApiProperty } from '@nestjs/swagger';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { ProductPresenter } from '../product/product.presenter';
import { ProviderPresenter } from '../provider/provider.presenter';

export class DeliveryNotePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  provider: ProviderPresenter;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  total: number;
  @ApiProperty()
  productItems: ProductItemPresenter[];

  static fromDeliveryNoteEntity(
    deliveryNote: DeliveryNoteEntity,
  ): DeliveryNotePresenter {
    return {
      id: deliveryNote.id,
      provider: ProviderPresenter.fromEntity(deliveryNote.provider),
      date: deliveryNote.date,
      total: deliveryNote.total,
      productItems: deliveryNote.productItems.map((productItem) =>
        ProductItemPresenter.fromProductItemEntity(productItem),
      ),
    };
  }
}

export class ProductItemPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  product: ProductPresenter;
  @ApiProperty()
  MFG: Date;
  @ApiProperty()
  EXP: Date;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;

  static fromProductItemEntity(
    productItem: ProductItemEntity,
  ): ProductItemPresenter {
    return {
      id: productItem.id,
      product: new ProductPresenter(productItem.product),
      MFG: productItem.MFG,
      EXP: productItem.EXP,
      cost: productItem.cost,
      price: productItem.price,
      quantity: productItem.quantity,
      description: productItem.description,
      image: productItem.image,
    };
  }
}

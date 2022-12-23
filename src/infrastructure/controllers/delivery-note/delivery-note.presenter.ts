import { ApiProperty } from '@nestjs/swagger';
import { DeliveryNoteEntity } from 'src/core/entities/delivery-note.entity';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { ProductPresenter } from '../product/product.presenter';
import { ProviderPresenter } from '../provider/provider.presenter';
import { UserPresenter } from '../user/user.presenter';

class ProductItemState {
  @ApiProperty()
  stateName: string;
  @ApiProperty()
  color: string;
}
class DeliveryNoteProductItemPresenter {
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
  initialQuantity: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
  @ApiProperty({
    type: ProductItemState,
    isArray: true,
  })
  state: ProductItemState[];

  static fromProductItemEntity(
    productItem: ProductItemEntity,
  ): DeliveryNoteProductItemPresenter {
    return {
      id: productItem.id,
      product: new ProductPresenter(productItem.product),
      MFG: productItem.MFG,
      EXP: productItem.EXP,
      cost: productItem.cost,
      price: productItem.price,
      quantity: productItem.quantity,
      initialQuantity: productItem.initialQuantity,
      description: productItem.description,
      image: productItem.image,
      state: productItem.state.map((st) => {
        return {
          stateName: st.stateName,
          color: st.color,
        };
      }),
    };
  }
}

export class DeliveryNotePresenterNoProductItems {
  @ApiProperty()
  id: number;
  @ApiProperty()
  provider: ProviderPresenter;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  total: number;
  @ApiProperty()
  shipper: string;
  @ApiProperty()
  creator: UserPresenter;
  @ApiProperty()
  totalQuantity: number;

  static fromDeliveryNoteEntity(
    deliveryNote: DeliveryNoteEntity,
  ): DeliveryNotePresenterNoProductItems {
    return {
      id: deliveryNote.id,
      provider: ProviderPresenter.fromEntity(deliveryNote.provider),
      date: deliveryNote.date,
      total: deliveryNote.total,
      shipper: deliveryNote.shipper,
      creator: new UserPresenter(deliveryNote.creator),
      totalQuantity: deliveryNote.totalQuantity,
    };
  }
}

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
  creator: UserPresenter;
  @ApiProperty({ isArray: true, type: DeliveryNoteProductItemPresenter })
  productItems: DeliveryNoteProductItemPresenter[];

  static fromDeliveryNoteEntity(
    deliveryNote: DeliveryNoteEntity,
  ): DeliveryNotePresenter {
    return {
      id: deliveryNote.id,
      provider: ProviderPresenter.fromEntity(deliveryNote.provider),
      date: deliveryNote.date,
      total: deliveryNote.total,
      productItems: deliveryNote.productItems.map((productItem) =>
        DeliveryNoteProductItemPresenter.fromProductItemEntity(productItem),
      ),
      creator: new UserPresenter(deliveryNote.creator),
    };
  }
}

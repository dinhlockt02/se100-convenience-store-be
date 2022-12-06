import { ApiProperty } from '@nestjs/swagger';
import { ProductItemEntity } from 'src/core/entities/product-item.entity';
import { DeliveryNotePresenter } from '../delivery-note/delivery-note.presenter';
import { ProductPresenter } from '../product/product.presenter';

class ProductItemState {
  @ApiProperty()
  stateName: string;
  @ApiProperty()
  color: string;
}

export class ProductItemPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  product: ProductPresenter;
  @ApiProperty()
  deliveryNote: DeliveryNotePresenter;
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
  ): ProductItemPresenter {
    return {
      id: productItem.id,
      product: new ProductPresenter(productItem.product),
      deliveryNote: DeliveryNotePresenter.fromDeliveryNoteEntity(
        productItem.deliveryNote,
      ),
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

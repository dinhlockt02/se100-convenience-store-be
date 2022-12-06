import { ApiProperty } from '@nestjs/swagger';
import { ProductItemQuantityStateRuleEntity } from 'src/core/entities/product-item-quantity-state-rule.entity';

export class ProductItemQuantityStateRulePresenter {
  @ApiProperty({
    type: Number,
  })
  id: number;
  @ApiProperty({
    type: String,
  })
  stateName: string;
  @ApiProperty({
    type: Number,
  })
  minVal: number;
  @ApiProperty({
    type: Number,
  })
  maxVal: number;
  @ApiProperty({
    type: String,
  })
  color: string;

  constructor(
    id: number,
    stateName: string,
    minVal: number,
    maxVal: number,
    color: string,
  ) {
    this.id = id;
    this.stateName = stateName;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.color = color;
  }

  static fromEntity(
    entity: ProductItemQuantityStateRuleEntity,
  ): ProductItemQuantityStateRulePresenter {
    return new ProductItemQuantityStateRulePresenter(
      entity.id,
      entity.stateName,
      entity.minVal,
      entity.maxVal,
      entity.color,
    );
  }
}

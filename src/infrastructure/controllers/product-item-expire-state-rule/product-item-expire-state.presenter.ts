import { ApiProperty } from '@nestjs/swagger';
import { ProductItemExpireStateRuleEntity } from 'src/core/entities/product-item-expire-state-rule.entity';

export class ProductItemExpireStateRulePresenter {
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
  val: number;
  @ApiProperty({
    type: String,
  })
  color: string;

  constructor(id: number, stateName: string, val: number, color: string) {
    this.id = id;
    this.stateName = stateName;
    this.val = val;
    this.color = color;
  }

  static fromEntity(
    entity: ProductItemExpireStateRuleEntity,
  ): ProductItemExpireStateRulePresenter {
    return new ProductItemExpireStateRulePresenter(
      entity.id,
      entity.stateName,
      entity.val,
      entity.color,
    );
  }
}

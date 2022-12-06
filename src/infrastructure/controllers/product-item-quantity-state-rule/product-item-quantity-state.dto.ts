import { ApiProperty } from '@nestjs/swagger';

export class ProductItemQuantityStateRuleDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  stateName: string;
  @ApiProperty({
    type: Number,
    required: true,
  })
  minVal: number;
  @ApiProperty({
    type: Number,
    required: true,
  })
  maxVal: number;
  @ApiProperty({
    type: String,
    required: true,
  })
  color: string;
}

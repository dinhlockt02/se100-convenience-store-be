import { ApiProperty } from '@nestjs/swagger';

export class ProductItemExpireStateRuleDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  stateName: string;
  @ApiProperty({
    type: Number,
    required: true,
  })
  val: number;
  @ApiProperty({
    type: String,
    required: true,
  })
  color: string;
}

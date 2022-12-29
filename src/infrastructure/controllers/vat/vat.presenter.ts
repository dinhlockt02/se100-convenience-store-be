import { ApiProperty } from '@nestjs/swagger';
import { VAT_RULE } from 'src/core/repositories/other-rules.repository.interface';

export class VATPresenter {
  @ApiProperty({ example: VAT_RULE })
  id: string;
  @ApiProperty({ example: 10 })
  val: number;
}

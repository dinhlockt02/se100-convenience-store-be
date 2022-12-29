import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class VatDto {
  @ApiProperty()
  @IsNumber()
  val: number;
}

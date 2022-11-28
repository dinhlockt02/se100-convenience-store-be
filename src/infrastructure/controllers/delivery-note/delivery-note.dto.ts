import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class DeliveryNoteDto {
  @ApiProperty({ required: true, example: 1 })
  providerId: number;
  @Type(() => Date)
  @ApiProperty({ required: true })
  date: Date;
}

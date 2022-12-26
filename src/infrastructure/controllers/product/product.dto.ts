import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ required: true })
  title: string;
  @ApiProperty({ example: 10, required: true })
  tax: number;
}

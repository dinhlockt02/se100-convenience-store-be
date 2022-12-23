import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true, example: 'test@example.com' })
  email: string;
  @ApiProperty({ required: true })
  address: string;
  @ApiProperty({ required: true, example: '0123456789' })
  phone: string;
  @ApiProperty({ required: true, example: 'John Doe' })
  representative: string;
}

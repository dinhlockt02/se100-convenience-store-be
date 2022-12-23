import { ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'src/core/entities/provider.entity';

export class ProviderPresenter {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ example: 'test@example.com' })
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty({ required: true, example: '0123456789' })
  phone: string;
  @ApiProperty({ required: true, example: 'John Doe' })
  representative: string;
  static fromEntity(providerEntity: ProviderEntity): ProviderPresenter {
    return {
      id: providerEntity.id,
      name: providerEntity.name,
      email: providerEntity.email,
      address: providerEntity.address,
      phone: providerEntity.phone,
      representative: providerEntity.representative,
    };
  }
}

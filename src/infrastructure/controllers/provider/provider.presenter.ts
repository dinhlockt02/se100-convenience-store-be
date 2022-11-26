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
  static fromEntity(providerEntity: ProviderEntity): ProviderPresenter {
    return {
      id: providerEntity.id,
      name: providerEntity.name,
      email: providerEntity.email,
      address: providerEntity.address,
    };
  }
}

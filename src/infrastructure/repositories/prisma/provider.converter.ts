import { Prisma, Provider } from '@prisma/client';
import { ProviderEntity } from 'src/core/entities/provider.entity';

export class ProviderConverter {
  static toProviderCreateInput(
    providerEntity: ProviderEntity,
  ): Prisma.ProviderCreateInput {
    return {
      name: providerEntity.name,
      address: providerEntity.address,
      email: providerEntity.email,
    };
  }
  static toProviderUpdateInput(
    providerEntity: ProviderEntity,
  ): Prisma.ProviderUpdateInput {
    return {
      name: providerEntity.name,
      address: providerEntity.address,
      email: providerEntity.email,
    };
  }
  static fromPrismaProvider(provider: Provider): ProviderEntity {
    if (!provider) {
      return null;
    }
    return new ProviderEntity(
      provider.id,
      provider.name,
      provider.address,
      provider.email,
      provider.phone,
      provider.representative,
    );
  }
}

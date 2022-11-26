import { Injectable } from '@nestjs/common';
import { Provider } from '@prisma/client';
import { ProviderEntity } from 'src/core/entities/provider.entity';
import { CoreException } from 'src/core/exceptions';
import { IProviderRepository } from 'src/core/repositories/provider.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { ProviderConverter } from './provider.converter';

@Injectable()
export class ProviderRepository implements IProviderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProvider(provider: ProviderEntity): Promise<ProviderEntity> {
    try {
      const createdProvider = await this.prisma.provider.create({
        data: ProviderConverter.toProviderCreateInput(provider),
      });
      return ProviderConverter.fromPrismaProvider(createdProvider);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async getProviders(): Promise<ProviderEntity[]> {
    try {
      const providers = await this.prisma.provider.findMany();
      return providers.map((provider: Provider) =>
        ProviderConverter.fromPrismaProvider(provider),
      );
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async getProvider(id: number): Promise<ProviderEntity> {
    try {
      const provider = await this.prisma.provider.findUnique({
        where: {
          id,
        },
      });
      return ProviderConverter.fromPrismaProvider(provider);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async updateProvider(provider: ProviderEntity): Promise<ProviderEntity> {
    try {
      const updatedProvider = await this.prisma.provider.update({
        where: {
          id: provider.id,
        },
        data: ProviderConverter.toProviderUpdateInput(provider),
      });
      return ProviderConverter.fromPrismaProvider(updatedProvider);
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
  async deleteProvider(id: number) {
    try {
      await this.prisma.provider.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new CoreException.DatabaseException(error);
    }
  }
}

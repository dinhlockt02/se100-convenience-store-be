import { Inject, Injectable } from '@nestjs/common';
import {
  IProviderRepository,
  IProviderRepositoryLabel,
} from 'src/core/repositories/provider.repository.interface';
import { GetProviderByIdUsecase } from './get-provider-by-id.usecase';

@Injectable()
export class DeleteProviderUsecase {
  constructor(
    @Inject(IProviderRepositoryLabel)
    private readonly providerRepository: IProviderRepository,
    private readonly getProviderByIdUsecase: GetProviderByIdUsecase,
  ) {}

  async execute(id: number) {
    const provider = await this.getProviderByIdUsecase.execute(id);
    await this.providerRepository.deleteProvider(provider.id);
  }
}

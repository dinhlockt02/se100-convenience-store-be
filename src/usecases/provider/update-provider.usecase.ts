import { Inject, Injectable } from '@nestjs/common';
import { ProviderEntity } from 'src/core/entities/provider.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProviderRepository,
  IProviderRepositoryLabel,
} from 'src/core/repositories/provider.repository.interface';
import { GetProviderByIdUsecase } from './get-provider-by-id.usecase';

@Injectable()
export class UpdateProviderUsecase {
  constructor(
    @Inject(IProviderRepositoryLabel)
    private readonly providerRepository: IProviderRepository,
    private readonly getProviderByIdUsecase: GetProviderByIdUsecase,
  ) {}

  async execute(
    id: number,
    name: string,
    address: string,
    email: string,
    phone: string,
    representative: string,
  ): Promise<ProviderEntity> {
    let providerEntity = await this.getProviderByIdUsecase.execute(id);

    providerEntity = providerEntity.copyWith(
      name,
      address,
      email,
      phone,
      representative,
      null,
    );

    const validationErrors = await providerEntity.validateData();
    if (validationErrors && validationErrors.length > 0) {
      throw new CoreException.ValidationException(
        'Invalid data',
        validationErrors,
      );
    }

    const updatedProviderEntity = await this.providerRepository.updateProvider(
      providerEntity,
    );

    return updatedProviderEntity;
  }
}

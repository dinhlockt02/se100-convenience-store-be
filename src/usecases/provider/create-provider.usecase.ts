import { Inject, Injectable } from '@nestjs/common';
import { ProviderEntity } from 'src/core/entities/provider.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IProviderRepository,
  IProviderRepositoryLabel,
} from 'src/core/repositories/provider.repository.interface';

@Injectable()
export class CreateProviderUsecase {
  constructor(
    @Inject(IProviderRepositoryLabel)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(
    name: string,
    address: string,
    email: string,
    phone: string,
    representative: string,
  ): Promise<ProviderEntity> {
    const providerEntity = new ProviderEntity(
      0,
      name,
      address,
      email,
      phone,
      representative,
    );

    const validationErrors = await providerEntity.validateData();
    if (validationErrors && validationErrors.length > 0) {
      throw new CoreException.ValidationException(
        'Invalid data',
        validationErrors,
      );
    }

    const newProviderEntity = await this.providerRepository.createProvider(
      providerEntity,
    );

    return newProviderEntity;
  }
}

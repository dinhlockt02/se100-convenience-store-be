import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/entities/user.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IUserRepository,
  IUserRepositoryLabel,
} from 'src/core/repositories/user.repository.interface';
import {
  IPasswordHasherService,
  IPasswordHasherServiceLabel,
} from 'src/core/services/password-hasher.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
    @Inject(IPasswordHasherServiceLabel)
    private readonly passwordHasherService: IPasswordHasherService,
  ) {}

  async execute(userEntity: UserEntity): Promise<UserEntity> {
    const existingUser = await this.userRepository.getUserByEmail(
      userEntity.email,
    );

    if (existingUser) {
      throw new CoreException.ConflictException(
        'User with provided email has existed',
      );
    }

    const validationErrors = await userEntity.validateData();
    if (validationErrors.length > 0) {
      throw new CoreException.ValidationException(
        'Validation failed',
        validationErrors,
      );
    }
    const hashedPassword = await this.passwordHasherService.hash(
      userEntity.password,
    );
    const createdUserEntity = await this.userRepository.createUser({
      ...userEntity,
      password: hashedPassword,
    } as UserEntity);
    return createdUserEntity;
  }
}

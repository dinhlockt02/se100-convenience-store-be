import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/entities/user.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IUserRepository,
  IUserRepositoryLabel,
} from 'src/core/repositories/user.repository.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userEntity: UserEntity): Promise<UserEntity> {
    const existingUser = await this.userRepository.getUserById(userEntity.id);
    if (!existingUser) {
      throw new CoreException.NotFoundException('User not found');
    }
    const validationErrors = await userEntity.validateData();

    if (validationErrors.length > 0) {
      throw new CoreException.ValidationException(
        'Validation failed',
        validationErrors,
      );
    }
    existingUser.address = userEntity.address;
    existingUser.email = userEntity.email;
    existingUser.fullname = userEntity.fullname;
    existingUser.birthday = userEntity.birthday;
    existingUser.identityNumber = userEntity.identityNumber;
    existingUser.gender = userEntity.gender;
    existingUser.phoneNumber = userEntity.phoneNumber;
    existingUser.other = userEntity.other;
    existingUser.avatar = userEntity.avatar;
    existingUser.role = userEntity.role;
    existingUser.active = userEntity.active;

    const updatedUser = await this.userRepository.updateUser(existingUser);
    return updatedUser;
  }
}

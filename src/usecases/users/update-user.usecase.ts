import { UserEntity } from 'src/core/entities/user.entity';
import { NotFoundException, ValidationException } from 'src/core/exceptions';
import { IUserRepository } from 'src/core/repositories/user.repository.interface';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userEntity: UserEntity): Promise<UserEntity> {
    const existingUser = await this.userRepository.getUserById(userEntity.id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const validationErrors = await userEntity.validateData();

    if (validationErrors.length > 0) {
      throw new ValidationException('Validation failed', validationErrors);
    }
    existingUser.address = userEntity.address;
    existingUser.email = userEntity.email;
    existingUser.fullname = userEntity.fullname;
    existingUser.birthday = userEntity.birthday;
    existingUser.identityNumber = userEntity.identityNumber;
    existingUser.gender = userEntity.gender;
    existingUser.phoneNumber = userEntity.phoneNumber;
    existingUser.other = userEntity.other;
    existingUser.address = userEntity.avatar;

    const updatedUser = await this.userRepository.updateUser(existingUser);
    return updatedUser;
  }
}

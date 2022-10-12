import { UserEntity } from 'src/core/entities/user.entity';
import {
  ConflictException,
  ValidationException,
} from 'src/core/exceptions/bussiness.exception';
import { IUserRepository } from 'src/core/repositories/user.repository.interface';
import { IPasswordHasherService } from 'src/core/services/password-hasher.service';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasherService: IPasswordHasherService,
  ) {}

  async execute(userEntity: UserEntity): Promise<UserEntity> {
    const existingUser = await this.userRepository.getUserByEmail(
      userEntity.email,
    );

    if (existingUser) {
      throw new ConflictException('User with provided email has existed');
    }

    const validationErrors = await userEntity.validateData();

    if (validationErrors.length > 0) {
      throw new ValidationException('Validation failed', validationErrors);
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

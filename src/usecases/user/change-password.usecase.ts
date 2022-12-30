import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from 'src/core/entities/user.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IUserRepositoryLabel,
  IUserRepository,
} from 'src/core/repositories/user.repository.interface';
import {
  IPasswordHasherServiceLabel,
  IPasswordHasherService,
} from 'src/core/services/password-hasher.service';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
    @Inject(IPasswordHasherServiceLabel)
    private readonly passwordHasherService: IPasswordHasherService,
  ) {}

  async execute(userId: number, password: string): Promise<UserEntity> {
    const existingUser = await this.userRepository.getUserById(userId);

    if (!existingUser) {
      throw new CoreException.NotFoundException('User not found');
    }

    const hashedPassword = await this.passwordHasherService.hash(password);
    return await this.userRepository.updatePassword(
      existingUser,
      hashedPassword,
    );
  }
}

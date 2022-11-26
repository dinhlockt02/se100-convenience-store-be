import { Inject, Injectable } from '@nestjs/common';
import { CoreException } from 'src/core/exceptions';
import {
  IUserRepository,
  IUserRepositoryLabel,
} from 'src/core/repositories/user.repository.interface';

@Injectable()
export class GetUserByIdUsecase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(id: number) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new CoreException.NotFoundException('User not found');
    }
    return user;
  }
}

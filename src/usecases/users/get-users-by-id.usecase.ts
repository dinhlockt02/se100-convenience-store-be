import { Logger } from '@nestjs/common';
import { NotFoundException } from 'src/core/exceptions';
import { IUserRepository } from 'src/core/repositories/user.repository.interface';

export class GetUserByIdUsecase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(id: number) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

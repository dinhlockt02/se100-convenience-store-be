import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryLabel,
} from 'src/core/repositories/user.repository.interface';

@Injectable()
export class DeleteUserByIdUsecase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(id: number) {
    return this.userRepository.deleteUser(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryLabel,
} from 'src/core/repositories/user.repository.interface';

@Injectable()
export class GetUsersUsecase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute() {
    return this.userRepository.getUsers();
  }
}

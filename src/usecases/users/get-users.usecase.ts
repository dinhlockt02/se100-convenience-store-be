import { IUserRepository } from 'src/core/repositories/user.repository.interface';

export class GetUsersUsecase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute() {
    return this.userRepository.getUsers();
  }
}

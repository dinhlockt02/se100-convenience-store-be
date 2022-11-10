import { IUserRepository } from 'src/core/repositories/user.repository.interface';

export class DeleteUserByIdUsecase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(id: number) {
    return this.userRepository.deleteUser(id);
  }
}

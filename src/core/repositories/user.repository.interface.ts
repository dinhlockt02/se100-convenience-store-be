import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<UserEntity>;
  getUserById(id: number): Promise<UserEntity>;
  createUser(userEntity: UserEntity): Promise<UserEntity>;
  getUsers(): Promise<UserEntity[]>;
  updateUser(updatedUser: UserEntity): Promise<UserEntity>;
  deleteUser(id: number): Promise<void>;
  updatePassword(
    userEntity: UserEntity,
    newPassword: string,
  ): Promise<UserEntity>;
}

export const IUserRepositoryLabel = 'IUserRepositoryLabel';

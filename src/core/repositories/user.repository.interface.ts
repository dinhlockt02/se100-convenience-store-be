import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<UserEntity>;
  createUser(userEntity: UserEntity): Promise<UserEntity>;
}

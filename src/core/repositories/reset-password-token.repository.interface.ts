import { ResetPasswordTokenEntity } from '../entities/reset-password-token.entity';
import { UserEntity } from '../entities/user.entity';

export interface IResetPasswordTokenRepository {
  createToken(userEntity: UserEntity): Promise<ResetPasswordTokenEntity>;
  verifyToken(token: string): Promise<UserEntity>;
}

export const IResetPasswordTokenRepositoryLabel =
  'IResetPasswordTokenRepositoryLabel';

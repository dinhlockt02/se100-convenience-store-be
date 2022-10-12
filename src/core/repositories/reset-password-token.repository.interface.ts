import { ResetPasswordTokenEntity } from '../entities/reset-password-token.entity';
import { UserEntity } from '../entities/user.entity';

export interface IResetPasswordTokenRepository {
  createToken(userEntity: UserEntity): Promise<ResetPasswordTokenEntity>;
  verifyToken(token: ResetPasswordTokenEntity): Promise<UserEntity>;
}

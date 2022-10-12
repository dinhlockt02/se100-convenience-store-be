import { ResetPasswordToken, User } from '@prisma/client';
import { ResetPasswordTokenEntity } from 'src/core/entities/reset-password-token.entity';
import { UserEntity } from 'src/core/entities/user.entity';

export class UserConverter {
  static toEntity(prismaUser: User): UserEntity {
    if (prismaUser == null) {
      return null;
    }
    const userEntity = new UserEntity();
    userEntity.email = prismaUser.email;
    userEntity.fullname = prismaUser.fullname;
    userEntity.id = prismaUser.id;
    userEntity.password = prismaUser.password;
    return userEntity;
  }
}

export class ResetPasswordTokenConverter {
  static toEntity(token: ResetPasswordToken & { user: User }) {
    const entity = new ResetPasswordTokenEntity();
    entity.id = token.id;
    entity.user = UserConverter.toEntity(token.user);
    return entity;
  }
}

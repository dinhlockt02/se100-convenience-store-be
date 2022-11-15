import {
  Gender as PrismaGender,
  ResetPasswordToken,
  Role as PrismaRole,
  User,
} from '@prisma/client';
import { ResetPasswordTokenEntity } from 'src/core/entities/reset-password-token.entity';
import { Gender, Role, UserEntity } from 'src/core/entities/user.entity';

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
    userEntity.birthday = prismaUser.birthday;
    userEntity.identityNumber = prismaUser.identityNumber;
    userEntity.gender =
      prismaUser.gender == PrismaGender.MALE ? Gender.Male : Gender.Female;
    userEntity.phoneNumber = prismaUser.phoneNumber;
    userEntity.address = prismaUser.address;
    userEntity.other = prismaUser.other;
    userEntity.avatar = prismaUser.avatar;
    userEntity.role =
      prismaUser.role == PrismaRole.MANAGER ? Role.Manager : Role.Employee;

    return userEntity;
  }
  static toDatabase(userEntity: UserEntity): User {
    if (userEntity == null) {
      return null;
    }
    const databaseUser = {} as User;
    databaseUser.email = userEntity.email;
    databaseUser.fullname = userEntity.fullname;
    databaseUser.id = userEntity.id;
    databaseUser.password = userEntity.password;
    databaseUser.birthday = userEntity.birthday;
    databaseUser.identityNumber = userEntity.identityNumber;
    databaseUser.gender =
      userEntity.gender == Gender.Male
        ? PrismaGender.MALE
        : PrismaGender.FEMALE;
    databaseUser.phoneNumber = userEntity.phoneNumber;
    databaseUser.address = userEntity.address;
    databaseUser.other = userEntity.other;
    databaseUser.avatar = userEntity.avatar;
    databaseUser.role =
      userEntity.role == Role.Employee
        ? PrismaRole.EMPLOYEE
        : PrismaRole.MANAGER;
    return databaseUser;
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

import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/entities/user.entity';
import { IUserRepository } from 'src/core/repositories/user.repository.interface';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/services/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUserByEmail(email: string): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return this.toEntity(prismaUser);
  }
  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.create({
      data: userEntity,
    });
    return this.toEntity(prismaUser);
  }

  toEntity(prismaUser: User): UserEntity {
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

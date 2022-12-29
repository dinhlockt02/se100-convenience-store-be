import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/entities/user.entity';
import { CoreException } from 'src/core/exceptions';
import { IUserRepository } from 'src/core/repositories/user.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { UserConverter } from './user.converter';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async updatePassword(
    userEntity: UserEntity,
    newPassword: string,
  ): Promise<UserEntity> {
    const [prismaUser] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: userEntity.id,
        },
        data: {
          password: newPassword,
        },
      }),
      this.prisma.resetPasswordToken.deleteMany(),
    ]);
    return UserConverter.toEntity(prismaUser);
  }

  async getUsers(): Promise<UserEntity[]> {
    const prismaUsers = await this.prisma.user.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return prismaUsers.map((prismaUser) => UserConverter.toEntity(prismaUser));
  }
  async updateUser(updatedUser: UserEntity): Promise<UserEntity> {
    try {
      const prismaUsers = await this.prisma.user.update({
        where: {
          id: updatedUser.id,
        },
        data: { ...UserConverter.toDatabase(updatedUser), email: undefined },
      });
      return UserConverter.toEntity(prismaUsers);
    } catch (error) {
      if (error.code == 'P2002') {
        throw new CoreException.ConflictException(
          'Identity number must be unique',
        );
      }
      throw new CoreException.DatabaseException(error);
    }
  }
  async deleteUser(id: number): Promise<void> {
    try {
      await this.prisma.user.deleteMany({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new CoreException.ConflictException('Product has been used');
      }
      throw new CoreException.ConflictException('User has been used');
    }
  }
  async getUserByEmail(email: string): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return UserConverter.toEntity(prismaUser);
  }
  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    try {
      const [prismaUser] = await this.prisma.$transaction([
        this.prisma.user.create({
          data: UserConverter.toDatabase(userEntity),
        }),
      ]);
      return UserConverter.toEntity(prismaUser);
    } catch (error) {
      if (error.code == 'P2002') {
        throw new CoreException.ConflictException(
          'Identity number must be unique',
        );
      }
      throw new CoreException.DatabaseException(error);
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return UserConverter.toEntity(prismaUser);
  }
}

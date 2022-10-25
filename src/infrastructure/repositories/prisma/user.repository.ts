import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/entities/user.entity';
import { IUserRepository } from 'src/core/repositories/user.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { UserConverter } from './converter';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers(): Promise<UserEntity[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map((prismaUser) => UserConverter.toEntity(prismaUser));
  }
  async updateUser(updatedUser: UserEntity): Promise<UserEntity> {
    const prismaUsers = await this.prisma.user.update({
      where: {
        id: updatedUser.id,
      },
      data: UserConverter.toDatabase(updatedUser),
    });
    return UserConverter.toEntity(prismaUsers);
  }
  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
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
    const prismaUser = await this.prisma.user.create({
      data: UserConverter.toDatabase(userEntity),
    });
    return UserConverter.toEntity(prismaUser);
  }
}

import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/entities/user.entity';
import { IUserRepository } from 'src/core/repositories/user.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { UserConverter } from './converter';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
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
      data: userEntity,
    });
    return UserConverter.toEntity(prismaUser);
  }
}

import { ResetPasswordTokenEntity } from 'src/core/entities/reset-password-token.entity';
import { UserEntity } from 'src/core/entities/user.entity';
import { IResetPasswordTokenRepository } from 'src/core/repositories/reset-password-token.repository.interface';
import { PrismaService } from 'src/infrastructure/services/prisma.service';
import { CoreException } from 'src/core/exceptions';
import { Injectable } from '@nestjs/common';
import { ResetPasswordTokenConverter, UserConverter } from './user.converter';

@Injectable()
export class ResetPasswordTokenRepository
  implements IResetPasswordTokenRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async createToken(userEntity: UserEntity): Promise<ResetPasswordTokenEntity> {
    if (!userEntity.id) {
      throw new CoreException.NotFoundException('User is not existed');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: userEntity.id,
      },
    });
    if (!user) {
      throw new CoreException.NotFoundException('User is not existed');
    }
    const token = await this.prisma.resetPasswordToken.create({
      data: {
        userId: user.id,
      },
      include: {
        user: true,
      },
    });
    return ResetPasswordTokenConverter.toEntity(token);
  }
  async verifyToken(token: ResetPasswordTokenEntity): Promise<UserEntity> {
    if (!token || !token.id) {
      throw new CoreException.NotFoundException('Token not found');
    }

    const existedToken = await this.prisma.resetPasswordToken.findUnique({
      where: {
        id: token.id,
      },
      include: {
        user: true,
      },
    });
    if (!existedToken) {
      throw new CoreException.NotFoundException('Token not found');
    }
    return UserConverter.toEntity(existedToken.user);
  }
}

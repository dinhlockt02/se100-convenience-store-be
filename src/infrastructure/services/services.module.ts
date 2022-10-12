import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptPasswordHasherService } from './bcrypt.password-hasher.service';
import { JwtAuthTokenService } from './jwt.auth-token.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [JwtModule, ConfigModule],
  providers: [PrismaService, BcryptPasswordHasherService, JwtAuthTokenService],
  exports: [PrismaService, BcryptPasswordHasherService, JwtAuthTokenService],
})
export class ServicesModule {}

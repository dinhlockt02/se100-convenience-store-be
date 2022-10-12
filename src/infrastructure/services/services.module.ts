import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptPasswordHasherService } from './bcrypt.password-hasher.service';
import { JwtAuthTokenService } from './jwt.auth-token.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SendEmailService } from './send-email.service';
@Module({
  imports: [JwtModule, ConfigModule],
  providers: [
    PrismaService,
    BcryptPasswordHasherService,
    JwtAuthTokenService,
    SendEmailService,
  ],
  exports: [
    PrismaService,
    BcryptPasswordHasherService,
    JwtAuthTokenService,
    SendEmailService,
  ],
})
export class ServicesModule {}

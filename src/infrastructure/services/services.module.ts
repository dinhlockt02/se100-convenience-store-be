import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptPasswordHasherService } from './bcrypt.password-hasher.service';
import { JwtAuthTokenService } from './jwt.auth-token.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SendEmailService } from './send-email.service';
import { IPasswordHasherServiceLabel } from 'src/core/services/password-hasher.service';
import { IAuthTokenServiceLabel } from 'src/core/services/auth-token.service';
import { ISendEmailServiceLabel } from 'src/core/services/send-email.service';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [
    PrismaService,
    {
      provide: IPasswordHasherServiceLabel,
      useClass: BcryptPasswordHasherService,
    },
    {
      provide: IAuthTokenServiceLabel,
      useClass: JwtAuthTokenService,
    },
    {
      provide: ISendEmailServiceLabel,
      useClass: SendEmailService,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: IPasswordHasherServiceLabel,
      useClass: BcryptPasswordHasherService,
    },
    {
      provide: IAuthTokenServiceLabel,
      useClass: JwtAuthTokenService,
    },
    {
      provide: ISendEmailServiceLabel,
      useClass: SendEmailService,
    },
  ],
})
export class ServicesModule {}

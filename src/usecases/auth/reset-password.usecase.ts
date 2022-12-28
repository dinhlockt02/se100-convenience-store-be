import { Injectable, Inject } from '@nestjs/common';
import { ResetPasswordTokenEntity } from 'src/core/entities/reset-password-token.entity';
import { CoreException } from 'src/core/exceptions';
import {
  IResetPasswordTokenRepositoryLabel,
  IResetPasswordTokenRepository,
} from 'src/core/repositories/reset-password-token.repository.interface';
import {
  IUserRepositoryLabel,
  IUserRepository,
} from 'src/core/repositories/user.repository.interface';
import {
  IPasswordHasherService,
  IPasswordHasherServiceLabel,
} from 'src/core/services/password-hasher.service';
import {
  ISendEmailServiceLabel,
  ISendEmailService,
} from 'src/core/services/send-email.service';

@Injectable()
export class ResetPasswordUsecase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
    @Inject(IResetPasswordTokenRepositoryLabel)
    private readonly resetPasswordTokenRepository: IResetPasswordTokenRepository,
    @Inject(IPasswordHasherServiceLabel)
    private readonly passwordHasherService: IPasswordHasherService,
  ) {}
  async execute(password: string, token: string) {
    const user = await this.resetPasswordTokenRepository.verifyToken(token);
    const hashedPassword = await this.passwordHasherService.hash(password);
    return await this.userRepository.updatePassword(user, hashedPassword);
  }
}

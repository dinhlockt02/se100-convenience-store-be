import {
  IUserRepository,
  IUserRepositoryLabel,
} from 'src/core/repositories/user.repository.interface';
import {
  ISendEmailService,
  ISendEmailServiceLabel,
} from 'src/core/services/send-email.service';
import {
  IResetPasswordTokenRepository,
  IResetPasswordTokenRepositoryLabel,
} from 'src/core/repositories/reset-password-token.repository.interface';
import { ResetPasswordTokenEntity } from 'src/core/entities/reset-password-token.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CoreException } from 'src/core/exceptions';

@Injectable()
export class ForgotPasswordUsecase {
  constructor(
    @Inject(IUserRepositoryLabel)
    private readonly userRepository: IUserRepository,
    @Inject(ISendEmailServiceLabel)
    private readonly sendEmailService: ISendEmailService,
    @Inject(IResetPasswordTokenRepositoryLabel)
    private readonly resetPasswordTokenRepository: IResetPasswordTokenRepository,
  ) {}
  async execute(email: string): Promise<ResetPasswordTokenEntity> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (!existingUser) {
      throw new CoreException.NotFoundException('User not found');
    }
    const token = await this.resetPasswordTokenRepository.createToken(
      existingUser,
    );
    await this.sendEmailService.sendResetPasswordEmail(token);
    return token;
  }
}

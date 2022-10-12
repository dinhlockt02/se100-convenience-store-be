import { IUserRepository } from 'src/core/repositories/user.repository.interface';
import * as BussinessException from 'src/core/exceptions';
import { ISendEmailService } from 'src/core/services/send-email.service';
import { IResetPasswordTokenRepository } from 'src/core/repositories/reset-password-token.repository.interface';
import { ResetPasswordTokenEntity } from 'src/core/entities/reset-password-token.entity';

export class ForgotPasswordUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sendEmailService: ISendEmailService,
    private readonly resetPasswordTokenRepository: IResetPasswordTokenRepository,
  ) {}
  async execute(email: string): Promise<ResetPasswordTokenEntity> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (!existingUser) {
      throw new BussinessException.ConflictException('User not found');
    }
    const token = await this.resetPasswordTokenRepository.createToken(
      existingUser,
    );
    await this.sendEmailService.sendResetPasswordEmail(token);
    return token;
  }
}

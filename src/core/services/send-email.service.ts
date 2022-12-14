import { ResetPasswordTokenEntity } from '../entities/reset-password-token.entity';
import { UserEntity } from '../entities/user.entity';

export interface ISendEmailService {
  sendEmail(userEntity: UserEntity, options: SendEmailOptions);
  sendResetPasswordEmail(
    resetPasswordTokenEntity: ResetPasswordTokenEntity,
    email: string,
    name: string,
  );
}

export class SendEmailOptions {
  title: string;
  content: string;
}

export const ISendEmailServiceLabel = 'ISendEmailServiceLabel';

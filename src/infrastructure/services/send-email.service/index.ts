import { UserEntity } from 'src/core/entities/user.entity';
import {
  ISendEmailService,
  SendEmailOptions,
} from 'src/core/services/send-email.service';
import ejs from 'ejs';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ResetPasswordTokenEntity } from 'src/core/entities/reset-password-token.entity';

@Injectable()
export class SendEmailService implements ISendEmailService {
  constructor(private readonly configService: ConfigService) {}
  sendEmail(userEntity: UserEntity, options: SendEmailOptions) {
    console.log('Sent');
  }
  async sendResetPasswordEmail(
    resetPasswordTokenEntity: ResetPasswordTokenEntity,
  ): Promise<string> {
    const resetPasswordUrl =
      this.configService.getOrThrow<string>('RESET_PASSWORD_URL');
    return `${resetPasswordUrl}?token=${resetPasswordTokenEntity.id}`;
  }

  // async getResetLink(): Promise<string> {}

  async loadResetPasswordTemplate(link: string, name: string): Promise<string> {
    const file_location = `${__dirname}/reset-email.template.ejs`;
    return ejs.renderFile(file_location, { link, name });
  }
}

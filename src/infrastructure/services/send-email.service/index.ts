import { UserEntity } from 'src/core/entities/user.entity';
import {
  ISendEmailService,
  SendEmailOptions,
} from 'src/core/services/send-email.service';
import * as ejs from 'ejs';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ResetPasswordTokenEntity } from 'src/core/entities/reset-password-token.entity';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendEmailService implements ISendEmailService {
  constructor(private readonly configService: ConfigService) {}
  async sendEmail(userEntity: UserEntity, options: SendEmailOptions) {
    console.log('Sent');
  }
  async sendResetPasswordEmail(
    resetPasswordTokenEntity: ResetPasswordTokenEntity,
    email: string,
    name: string,
  ): Promise<string> {
    const resetPasswordUrl =
      this.configService.getOrThrow<string>('RESET_PASSWORD_URL');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email, // Change to your recipient
<<<<<<< HEAD
      from: '__', // Change to your verified sender
=======
      from: '___', // Change to your verified sender
>>>>>>> 5026dd5 (Change sendgrid key)
      subject: 'Reset password',
      html: await this.loadResetPasswordTemplate(
        `${resetPasswordUrl}?token=${resetPasswordTokenEntity.id}`,
        name,
      ),
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
    return `${resetPasswordUrl}?token=${resetPasswordTokenEntity.id}`;
  }

  // async getResetLink(): Promise<string> {}

  async loadResetPasswordTemplate(link: string, name: string): Promise<string> {
    const file_location = `${__dirname}/reset-email.template.ejs`;
    return ejs.renderFile(file_location, { link, name });
  }
}

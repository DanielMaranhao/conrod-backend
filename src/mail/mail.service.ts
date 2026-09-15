import { User } from '#d/users/entities/user.entity.js';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendAccountConfirmation(user: User) {
    const { name, email } = user;

    const mailData = {
      to: email,
      subject: 'Conrod Shop - Account created',
      template: './account-confirmation',
      context: { name },
    } as const satisfies ISendMailOptions;

    return this.mailerService.sendMail(mailData);
  }
}

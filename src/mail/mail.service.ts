import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'users/entities/user.entity';

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

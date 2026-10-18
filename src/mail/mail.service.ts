import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { MailPayload } from './interfaces/mail-payload.interface.js';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly mailerService: MailerService) {}

  sendAccountConfirmation(data: MailPayload['sendAccountConfirmation']) {
    const { name, email } = data;

    const mailData = {
      to: email,
      subject: 'Account created',
      template: './account-confirmation',
      context: { name },
    } as const satisfies ISendMailOptions;

    return this.mailerService.sendMail(mailData);
  }
}

type IMailService = {
  [K in keyof MailPayload]: (data: MailPayload[K]) => Promise<SentMessageInfo>;
};

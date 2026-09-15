import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import mailConfig from './config/mail.config.js';
import { MailService } from './mail.service.js';

@Module({
  imports: [MailerModule.forRootAsync(mailConfig.asProvider())],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

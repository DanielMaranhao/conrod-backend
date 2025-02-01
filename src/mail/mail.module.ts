import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import mailConfig from './config/mail.config';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(mailConfig.asProvider())],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

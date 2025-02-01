import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { registerAs } from '@nestjs/config';
import { resolve } from 'path';

export default registerAs('mail', () => {
  const protocol = process.env.MAIL_PROTOCOL;
  const host = process.env.MAIL_HOST;
  const user = process.env.MAIL_USER;
  const password = process.env.MAIL_PASSWORD;
  const from = process.env.MAIL_FROM;

  const transport = `${protocol}://${user}:${password}@${host}`;

  const config = {
    transport,
    defaults: {
      from: `No Reply <${from}>`,
    },
    template: {
      dir: resolve(__dirname, '..', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: { strict: true },
    },
  } as const satisfies MailerOptions;
  return config;
});

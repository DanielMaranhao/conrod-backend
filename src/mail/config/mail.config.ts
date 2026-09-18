import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { registerAs } from '@nestjs/config';
import { resolve } from 'path';
import { env } from 'process';

export default registerAs('mail', () => {
  const protocol = env.MAIL_PROTOCOL!;
  const host = env.MAIL_HOST!;
  const user = env.MAIL_USER!;
  const password = env.MAIL_PASSWORD!;
  const from = env.MAIL_FROM!;

  const transport = `${protocol}://${user}:${password}@${host}`;

  const config = {
    transport,
    defaults: { from: `No Reply <${from}>` },
    template: {
      dir: resolve(import.meta.dirname, '..', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: { strict: true },
    },
  } as const satisfies MailerOptions;
  return config;
});

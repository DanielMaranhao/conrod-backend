import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { registerAs } from '@nestjs/config';
import { resolve } from 'path';
import { env } from 'process';

export default registerAs('mail', () => {
  const user = env.MAIL_USER!;
  const password = env.MAIL_PASSWORD!;
  const host = env.MAIL_HOST!;
  const port = env.MAIL_PORT!;
  const from = env.MAIL_FROM!;

  const transport = `smtp://${user}:${password}@${host}:${port}`;

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

import { z } from 'zod';
import { ze } from './env.util.js';

export const ENV_VALIDATION_SCHEMA = z.object({
  APP_PORT: ze.port,

  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.hostname(),
  DATABASE_PORT: ze.port,
  DATABASE_NAME: z.string(),

  JWT_SECRET: z.hex().length(64),
  JWT_TTL: ze.ms,

  THROTTLER_TTL: ze.ms,
  THROTTLER_LIMIT: ze.cardinal,

  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_HOST: z.hostname(),
  MAIL_PORT: ze.port,
  MAIL_FROM: z.email(),
});

import { ze } from '#/env/util/env.util.js';
import { z } from 'zod';

export const TEST_ENV_VALIDATION_SCHEMA = z.object({
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.hostname(),
  DATABASE_PORT: ze.port,
  DATABASE_NAME: z.string(),
});

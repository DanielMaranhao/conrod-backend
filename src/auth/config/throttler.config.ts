import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import ms, { type StringValue } from 'ms';
import { env } from 'process';

export default registerAs('throttler', () => {
  const ttl = ms(env.THROTTLER_TTL! as StringValue);
  const limit = +env.THROTTLER_LIMIT!;

  const config = [
    {
      ttl,
      limit,
    },
  ] as const satisfies ThrottlerModuleOptions;
  return config;
});

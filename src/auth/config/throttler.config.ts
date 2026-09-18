import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import ms, { type StringValue } from 'ms';

export default registerAs('throttler', () => {
  const ttl = ms(process.env.THROTTLER_TTL! as StringValue);
  const limit = +process.env.THROTTLER_LIMIT!;

  const config = [
    {
      ttl,
      limit,
    },
  ] as const satisfies ThrottlerModuleOptions;
  return config;
});

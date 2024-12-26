import { registerAs } from '@nestjs/config';
import { seconds, ThrottlerModuleOptions } from '@nestjs/throttler';

export default registerAs('throttler', () => {
  const config = [
    {
      ttl: seconds(+process.env.THROTTLER_TTL),
      limit: +process.env.THROTTLER_LIMIT,
    },
  ] as const satisfies ThrottlerModuleOptions;
  return config;
});

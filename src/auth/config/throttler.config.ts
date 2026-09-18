import { registerAs } from '@nestjs/config';
import { seconds, ThrottlerModuleOptions } from '@nestjs/throttler';

export default registerAs('throttler', () => {
  const ttl = seconds(+process.env.THROTTLER_TTL!);
  const limit = +process.env.THROTTLER_LIMIT!;

  const config = [
    {
      ttl,
      limit,
    },
  ] as const satisfies ThrottlerModuleOptions;
  return config;
});

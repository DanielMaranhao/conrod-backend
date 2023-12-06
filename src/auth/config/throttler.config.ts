import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export default registerAs('throttler', () => {
  const config = [
    {
      ttl: +process.env.THROTTLER_TTL,
      limit: +process.env.THROTTLER_LIMIT,
    } as const,
  ] satisfies ThrottlerModuleOptions;
  return config;
});

import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { type StringValue } from 'ms';
import { env } from 'process';

export default registerAs('jwt', () => {
  const secret = env.JWT_SECRET!;
  const ttl = env.JWT_TTL! as StringValue;

  const config = {
    secret,
    signOptions: {
      expiresIn: ttl,
    },
  } as const satisfies JwtModuleOptions;
  return config;
});

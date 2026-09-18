import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { type StringValue } from 'ms';

export default registerAs('jwt', () => {
  const secret = process.env.JWT_SECRET!;
  const ttl = process.env.JWT_TTL! as StringValue;

  const config = {
    secret,
    signOptions: {
      expiresIn: ttl,
    },
  } as const satisfies JwtModuleOptions;
  return config;
});

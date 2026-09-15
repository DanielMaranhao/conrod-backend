import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import ms from 'ms';

export default registerAs('jwt', () => {
  const config = {
    secret: process.env.JWT_SECRET!,
    signOptions: {
      expiresIn: process.env.JWT_TTL! as ms.StringValue,
    },
  } as const satisfies JwtModuleOptions;
  return config;
});

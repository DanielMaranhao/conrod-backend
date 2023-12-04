import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt', () => {
  const config = {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_TTL,
    },
  } as const satisfies JwtModuleOptions;
  return config;
});

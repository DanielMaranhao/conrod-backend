import { ApiResponseOptions } from '@nestjs/swagger';

export const JwtCookieHeader: ApiResponseOptions['headers'] = {
  'Set-Cookie': { description: 'JWT cookie', schema: { type: 'string' } },
};

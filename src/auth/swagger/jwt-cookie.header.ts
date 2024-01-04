import { HeadersObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const JwtCookieHeader: HeadersObject = {
  'Set-Cookie': { description: 'JWT cookie', schema: { type: 'string' } },
};

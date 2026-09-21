import { Request } from 'express';
import { ClsModuleOptions } from 'nestjs-cls';

export const AlsConfig = {
  global: true,
  interceptor: {
    mount: true,
    setup: (cls, context) => {
      const request = context.switchToHttp().getRequest<Request>();
      cls.set('user', request.user);
    },
  },
} as const satisfies ClsModuleOptions;

import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
} as const satisfies ValidationPipeOptions;

export const MAX_INT_32 = 2 ** 31 - 1;

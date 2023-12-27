import { HttpStatus } from '@nestjs/common';

export const HttpError = {
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    error: 'Not Found',
  },
  CONFLICT: {
    status: HttpStatus.CONFLICT,
    error: 'Conflict',
  },
} as const satisfies Record<string, IHttpError>;

interface IHttpError {
  readonly status: HttpStatus;
  readonly error: string;
}

export type HttpError = (typeof HttpError)[keyof typeof HttpError];

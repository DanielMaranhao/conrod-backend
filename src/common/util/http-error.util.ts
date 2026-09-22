import { HttpException, HttpStatus, Type } from '@nestjs/common';

export interface HttpError {
  readonly status: HttpStatus;
  readonly error: string;
}

export const extractHttpError = (
  ExceptionClass: Type<HttpException>,
): HttpError => {
  const exception = new ExceptionClass();

  const status = exception.getStatus();
  const error = exception.message;

  return { status, error };
};

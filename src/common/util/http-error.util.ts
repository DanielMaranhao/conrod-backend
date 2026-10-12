import { HttpException, HttpStatus, Type } from '@nestjs/common';

export interface HttpError {
  readonly status: HttpStatus;
  readonly error: string;
}

export const extractHttpError = (ExceptionClass: Type<HttpException>) => {
  const exception = new ExceptionClass();

  const status = exception.getStatus();
  const error = exception.message;

  const httpError: HttpError = { status, error };
  return httpError;
};

import { extractHttpError, HttpError } from '#/common/util/http-error.util.js';
import { extractFromText } from '#/common/util/regex.util.js';
import { DatabaseError } from '#/database/interfaces/database-error.interface.js';
import {
  ArgumentsHost,
  Catch,
  ConflictException,
  HttpExceptionBody,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter extends BaseExceptionFilter {
  catch(exception: DatabaseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const { code, detail, table } = exception;
    const { httpError, errorCode } = this.createErrorData(code, detail);

    if (!httpError) {
      return super.catch(exception, host);
    }

    const { status, error } = httpError;
    const { fieldName, fieldValue } = this.extractMessageData(detail);
    const meta: Meta = { fieldName, fieldValue, table };

    const body: ExceptionBody = {
      statusCode: status,
      message: detail,
      error,
      errorCode,
      meta,
    };

    response.status(status).json(body);
  }

  private extractMessageData(message: string) {
    const fieldName = extractFromText(message, this.FIELD_NAME_REGEX);
    const fieldValue = extractFromText(message, this.FIELD_VALUE_REGEX);
    return { fieldName, fieldValue };
  }

  private readonly FIELD_NAME_REGEX = /(?<=Key \()\w+/;
  private readonly FIELD_VALUE_REGEX = /(?<=\)=\().*?(?=\))/;

  private createErrorData(code: string, message: string) {
    let httpError: HttpError | undefined;
    let errorCode: HttpExceptionBody['errorCode'];

    switch (code) {
      case this.DatabaseErrorCode.ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION:
        switch (true) {
          case message.includes(this.MessageSnippet.ASSOCIATION_NOT_FOUND):
            httpError = extractHttpError(NotFoundException);
            break;

          case message.includes(this.MessageSnippet.NOT_NULL_VIOLATION):
            httpError = extractHttpError(ConflictException);
            errorCode = this.ErrorCode.NOT_NULL_VIOLATION;
            break;
        }
        break;

      case this.DatabaseErrorCode.UNIQUE_VIOLATION:
        httpError = extractHttpError(ConflictException);
        errorCode = this.ErrorCode.UNIQUE_VIOLATION;
        break;
    }

    return { httpError, errorCode };
  }

  private readonly DatabaseErrorCode = {
    ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION: '23503',
    UNIQUE_VIOLATION: '23505',
  } as const satisfies Record<string, string>;

  private readonly MessageSnippet = {
    ASSOCIATION_NOT_FOUND: 'is not present',
    NOT_NULL_VIOLATION: 'is still referenced',
  } as const satisfies Record<string, string>;

  private readonly ErrorCode = {
    NOT_NULL_VIOLATION: 'NOT_NULL_VIOLATION',
    UNIQUE_VIOLATION: 'UNIQUE_VIOLATION',
  } as const satisfies Record<string, string>;
}

interface Meta {
  fieldName: string;
  fieldValue: string;
  table: string;
}

type ExtraProperties = { meta: Meta };
type ExceptionBody = HttpExceptionBody & ExtraProperties;

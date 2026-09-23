import { extractHttpError, HttpError } from '#/common/util/http-error.util.js';
import { extractFromText } from '#/common/util/regex.util.js';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpExceptionBody,
  PayloadTooLargeException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import bytes from 'bytes';
import { Response } from 'express';
import { extension } from 'mime-types';

@Catch(UnprocessableEntityException)
export class FilesExceptionFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { message } = exception;

    const { httpError, errorCode, meta } = this.createErrorData(message);
    const { status, error } = httpError;

    const body: ExceptionBody = {
      statusCode: status,
      message,
      error,
      errorCode,
      meta,
    };

    response.status(status).json(body);
  }

  private extractMaxSize(message: string) {
    const maxSizeStr = extractFromText(message, this.MAX_FILE_SIZE_REGEX);

    const maxSizeInBytes = +maxSizeStr;
    if (isNaN(maxSizeInBytes)) {
      throw new Error(`Could not parse "${maxSizeStr}" to number`);
    }

    const maxSize = bytes(maxSizeInBytes)!;
    return maxSize;
  }

  private extractFileTypes(message: string) {
    const mediaTypesStr = extractFromText(message, this.FILE_TYPES_REGEX);

    const mediaTypesWithBackslashes = mediaTypesStr.split('|');
    const mediaTypes = mediaTypesWithBackslashes.map((type) =>
      type.replace('\\', ''),
    );

    const fileTypes = mediaTypes.map((type) => extension(type));
    return fileTypes;
  }

  private readonly MAX_FILE_SIZE_REGEX = /(?<=less than )\d+/;
  private readonly FILE_TYPES_REGEX = /(?<=expected type is \/).*(?=\/)/;

  private createErrorData(message: string) {
    let httpError: HttpError;
    let errorCode: HttpExceptionBody['errorCode'];

    let maxSize: Meta['maxSize'];
    let expectedFileTypes: Meta['expectedFileTypes'];

    switch (true) {
      case message.includes(this.MessageSnippet.MAX_SIZE):
        httpError = extractHttpError(PayloadTooLargeException);
        maxSize = this.extractMaxSize(message);
        break;

      case message.includes(this.MessageSnippet.FILE_TYPE):
        httpError = extractHttpError(UnsupportedMediaTypeException);
        errorCode = this.ErrorCode.FILE_TYPE;
        expectedFileTypes = this.extractFileTypes(message);
        break;

      case message.includes(this.MessageSnippet.FILE_SIGNATURE):
        httpError = extractHttpError(UnsupportedMediaTypeException);
        errorCode = this.ErrorCode.FILE_SIGNATURE;
        break;

      default:
        httpError = extractHttpError(BadRequestException);
    }

    const meta: Meta = { maxSize, expectedFileTypes };

    return { httpError, errorCode, meta };
  }

  private readonly MessageSnippet = {
    MAX_SIZE: 'expected size',
    FILE_TYPE: 'expected type',
    FILE_SIGNATURE: 'does not match',
  } as const satisfies Record<string, string>;

  private readonly ErrorCode = {
    FILE_TYPE: 'INVALID_FILE_TYPE',
    FILE_SIGNATURE: 'INVALID_FILE_SIGNATURE',
  } as const satisfies Record<string, string>;
}

type Meta = {
  maxSize?: string;
  expectedFileTypes?: (string | false)[];
};

type ExtraProperties = { meta: Meta };
type ExceptionBody = HttpExceptionBody & ExtraProperties;

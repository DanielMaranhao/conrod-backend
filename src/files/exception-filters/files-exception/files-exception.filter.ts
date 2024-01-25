import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bytes from 'bytes';
import { HttpError } from 'common/util/http-error.util';
import { extractFromText } from 'common/util/regex.util';
import { Response } from 'express';
import { extension } from 'mime-types';

@Catch(UnprocessableEntityException)
export class FilesExceptionFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { message } = exception;

    const { httpError, ...meta } = this.createErrorData(message);
    const { status, error } = httpError;

    response.status(status).json({
      statusCode: status,
      message,
      error,
      meta,
    });
  }

  private extractMaxSize(message: string) {
    const maxSizeStr = extractFromText(message, this.MAX_FILE_SIZE_REGEX);

    const maxSizeInBytes = +maxSizeStr;

    const maxSize = bytes(maxSizeInBytes);
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

  private readonly MAX_FILE_SIZE_REGEX = /less than (\d+)/;
  private readonly FILE_TYPES_REGEX = /\/(.*)\//;

  private createErrorData(message: string) {
    let httpError: HttpError;
    let description: string;

    let maxSize: string;
    let expectedFileTypes: (string | false)[];

    if (message.includes(this.MessageSnippet.MAX_SIZE)) {
      httpError = HttpError.PAYLOAD_TOO_LARGE;
      maxSize = this.extractMaxSize(message);
    } else if (message.includes(this.MessageSnippet.FILE_TYPE)) {
      httpError = HttpError.UNSUPPORTED_MEDIA_TYPE;
      description = this.Description.FILE_TYPE;
      expectedFileTypes = this.extractFileTypes(message);
    } else if (message.includes(this.MessageSnippet.FILE_SIGNATURE)) {
      httpError = HttpError.UNSUPPORTED_MEDIA_TYPE;
      description = this.Description.FILE_SIGNATURE;
    } else {
      httpError = HttpError.BAD_REQUEST;
    }

    return { httpError, description, maxSize, expectedFileTypes };
  }

  private readonly MessageSnippet = {
    MAX_SIZE: 'expected size',
    FILE_TYPE: 'expected type',
    FILE_SIGNATURE: 'does not match',
  } as const satisfies Record<string, string>;

  private readonly Description = {
    FILE_TYPE: 'Invalid file type',
    FILE_SIGNATURE: 'File type tampered',
  } as const satisfies Record<string, string>;
}

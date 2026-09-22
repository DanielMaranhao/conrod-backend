import { extractHttpError } from '#/common/util/http-error.util.js';
import { extractFromText } from '#/common/util/regex.util.js';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const { status, error } = extractHttpError(NotFoundException);
    const { entityName } = this.extractMessageData(exception.message);
    const message = `${entityName} not found`;

    response.status(status).json({ statusCode: status, message, error });
  }

  private extractMessageData(message: string) {
    const entityName = extractFromText(message, this.ENTITY_NAME_REGEX);
    return { entityName };
  }

  private readonly ENTITY_NAME_REGEX = /(?<=type\s")\w+/;
}

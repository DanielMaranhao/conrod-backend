import { extractHttpError } from '#/common/util/http-error.util.js';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpExceptionBody,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, ObjectType } from 'typeorm';

@Catch(EntityNotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const { entityClass, criteria } = exception;
    const entity = entityClass as ObjectType<any>;

    const response = host.switchToHttp().getResponse<Response>();

    const { status, error } = extractHttpError(NotFoundException);
    const entityName = entity.name;
    const id = this.extractId(criteria);
    const message = `${entityName} #${id} not found`;

    const body: HttpExceptionBody = {
      statusCode: status,
      message,
      error,
    };

    response.status(status).json(body);
  }

  private extractId(criteria: EntityNotFoundError['criteria']) {
    const { where, id } = criteria;

    if (where) return where.id;
    return id;
  }
}

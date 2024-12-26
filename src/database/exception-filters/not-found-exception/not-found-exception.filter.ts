import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpError } from 'common/util/http-error.util';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const { status, error } = HttpError.NOT_FOUND;
    const { entityName } = this.extractMessageData(exception.message);
    const message = `${entityName} not found`;

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }

  private extractMessageData(message: string) {
    const entityName = message.match(this.ENTITY_NAME_REGEX)[0];
    return { entityName };
  }

  private readonly ENTITY_NAME_REGEX = /(?<=type\s")\w+/;
}

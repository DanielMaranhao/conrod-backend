import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const ValidationMiddleware = <TDto extends Type>(DtoClass: TDto) => {
  @Injectable()
  class ValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      const dto = plainToInstance(DtoClass, req.body);
      const errors = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length) {
        const errorMessages = errors.flatMap((error) =>
          Object.values(error.constraints),
        );
        throw new BadRequestException(errorMessages);
      }

      next();
    }
  }

  return ValidationMiddleware;
};

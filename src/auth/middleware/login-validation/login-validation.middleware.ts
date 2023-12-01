import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { LoginDto } from 'auth/dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const loginDto = plainToInstance(LoginDto, req.body);
    const errors = await validate(loginDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints).join(),
      );
      throw new BadRequestException(errorMessages);
    }

    next();
  }
}

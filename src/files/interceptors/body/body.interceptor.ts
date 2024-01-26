import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const body = JSON.parse(request.body.body);
      request.body = body;
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return next.handle();
  }
}

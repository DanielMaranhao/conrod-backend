import { BadRequestException, type Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  buildMessage,
  validate,
  ValidateBy,
  type ValidationOptions,
} from 'class-validator';
import type { Request } from 'express';

interface ValidatorParams {
  key: string;
  message: string;
  validate: (value: string) => boolean;
}

export const createValidator = (
  { key, message, validate }: ValidatorParams,
  options?: ValidationOptions,
) =>
  ValidateBy(
    {
      name: key,
      validator: {
        validate: (value) => validate(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + message,
          options,
        ),
      },
    },
    options,
  );

export const validateDto = async <TDto extends Type>(
  DtoClass: TDto,
  body: Request['body'] = {},
) => {
  const dto = plainToInstance(DtoClass, body);
  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length) {
    const errorMessages = errors.flatMap((error) =>
      Object.values(error.constraints!),
    );
    throw new BadRequestException(errorMessages);
  }
};

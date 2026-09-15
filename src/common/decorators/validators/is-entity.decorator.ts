import { IdDto } from '#/common/dto/id.dto.js';
import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

/** Checks if the value is an object with only a serial id. */
export const IsEntity = (): PropertyDecorator =>
  applyDecorators(
    IsDefined(),
    ValidateNested(),
    Type(() => IdDto),
  );

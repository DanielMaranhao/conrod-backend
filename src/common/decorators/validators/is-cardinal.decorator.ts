import { applyDecorators } from '@nestjs/common';
import { IsInt, IsPositive, Max, ValidationOptions } from 'class-validator';
import { MAX_INT_32 } from 'common/util/common.constants';

/** Checks if the value is a positive integer greater than zero, lower than the max value for INT_32. */
export const IsCardinal = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(
    IsInt(validationOptions),
    IsPositive(validationOptions),
    Max(MAX_INT_32, validationOptions),
  );

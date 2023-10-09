import { applyDecorators } from '@nestjs/common';
import { IsNumber, IsPositive, ValidationOptions } from 'class-validator';

/**
 * Checks if the value is a positive number greater than zero with, at the most, two decimal places.
 */
export const IsCurrency = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(
    IsNumber({ maxDecimalPlaces: 2 }, validationOptions),
    IsPositive(validationOptions),
  );

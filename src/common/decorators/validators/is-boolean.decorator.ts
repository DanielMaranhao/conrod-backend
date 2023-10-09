import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean as DefaultIsBoolean,
  ValidationOptions,
} from 'class-validator';
import { ToBoolean } from '../transformers/to-boolean.decorator';

/**
 * Checks if the value is a boolean. Works with query params.
 */
export const IsBoolean = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(DefaultIsBoolean(validationOptions), ToBoolean());

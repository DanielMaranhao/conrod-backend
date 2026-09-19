import { applyDecorators } from '@nestjs/common';
import { Length, ValidationOptions } from 'class-validator';
import {
  HasLowercaseLetter,
  HasNumber,
  HasOnlyRequiredCharacters,
  HasSpecialCharacter,
  HasUppercaseLetter,
} from './text/index.js';

/**
 * Checks if the value is a string following these rules:
 * 1. 8 to 20 characters
 * 2. At least one
 * - Lowercase letter
 * - Uppercase letter
 * - Number
 * - Special character
 */
export const IsPassword = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(
    HasLowercaseLetter(validationOptions),
    HasUppercaseLetter(validationOptions),
    HasNumber(validationOptions),
    HasSpecialCharacter(validationOptions),
    HasOnlyRequiredCharacters(validationOptions),
    Length(8, 20, validationOptions),
  );

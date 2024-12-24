import { applyDecorators } from '@nestjs/common';
import { Length, ValidationOptions } from 'class-validator';
import { ContainsLowercaseLetter } from './text/contains-lowercase-letter.decorator';
import { ContainsNumber } from './text/contains-number.decorator';
import { ContainsSpecialCharacter } from './text/contains-special-character.decorator';
import { ContainsUppercaseLetter } from './text/contains-uppercase-letter.decorator';
import { OnlyRequiredCharacters } from './text/only-required-characters.decorator';

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
    ContainsLowercaseLetter(validationOptions),
    ContainsUppercaseLetter(validationOptions),
    ContainsNumber(validationOptions),
    ContainsSpecialCharacter(validationOptions),
    OnlyRequiredCharacters(validationOptions),
    Length(8, 20, validationOptions),
  );

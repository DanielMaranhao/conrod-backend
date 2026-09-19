import { createValidator } from '#/common/util/validation.util.js';
import { ValidationOptions, matches } from 'class-validator';

const regex = /^[a-zA-Z\d@$!%*?&]+$/;

const key = 'hasOnlyRequiredCharacters';
const message =
  '$property must have only letters, numbers and the following special characters: @$!%*?&';
const validate = (value: string) => matches(value, regex);

export const HasOnlyRequiredCharacters = (options?: ValidationOptions) =>
  createValidator({ key, message, validate }, options);

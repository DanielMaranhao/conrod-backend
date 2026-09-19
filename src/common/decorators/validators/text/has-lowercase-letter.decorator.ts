import { createValidator } from '#/common/util/validation.util.js';
import { ValidationOptions, matches } from 'class-validator';

const regex = /[a-z]/;

const key = 'hasLowercaseLetter';
const message = '$property must have at least one lowercase letter';
const validate = (value: string) => matches(value, regex);

export const HasLowercaseLetter = (options?: ValidationOptions) =>
  createValidator({ key, message, validate }, options);

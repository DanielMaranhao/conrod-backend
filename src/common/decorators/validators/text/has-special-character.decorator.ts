import { createValidator } from '#/common/util/validation.util.js';
import { ValidationOptions, matches } from 'class-validator';

const regex = /[@$!%*?&]/;

const key = 'hasSpecialCharacter';
const message = '$property must have a special character';
const validate = (value: string) => matches(value, regex);

export const HasSpecialCharacter = (options?: ValidationOptions) =>
  createValidator({ key, message, validate }, options);

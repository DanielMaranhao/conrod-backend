import { createValidator } from '#/common/util/validation.util.js';
import { ValidationOptions, matches } from 'class-validator';

const regex = /[A-Z]/;

const key = 'hasUppercaseLetter';
const message = '$property must have an uppercase letter';
const validate = (value: string) => matches(value, regex);

export const HasUppercaseLetter = (options?: ValidationOptions) =>
  createValidator({ key, message, validate }, options);

import { createValidator } from '#/common/util/validation.util.js';
import { ValidationOptions, matches } from 'class-validator';

const regex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

const key = 'isAlphaWithSpaces';
const message =
  '$property must have only letters and spaces (no consecutive, leading or trailing)';
const validate = (value: string) => matches(value, regex);

export const IsAlphaWithSpaces = (options?: ValidationOptions) =>
  createValidator({ key, message, validate }, options);

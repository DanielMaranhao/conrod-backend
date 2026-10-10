import { createValidator } from '#/common/util/validation.util.js';
import { ValidationOptions, matches } from 'class-validator';

const regex = /[\d]/;

const key = 'hasNumber';
const message = '$property must have a number';
const validate = (value: string) => matches(value, regex);

export const HasNumber = (options?: ValidationOptions) =>
  createValidator({ key, message, validate }, options);

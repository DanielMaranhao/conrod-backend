import { createValidator } from '#/common/util/validation.util.js';
import { matches, ValidationOptions } from 'class-validator';

const regex = /^[\p{L} ]+$/u;

const key = 'isName';
const message = '$property must have only unicode letters and spaces';
const validate = (value: string) => matches(value, regex);

export const IsName = (options?: ValidationOptions) =>
  createValidator({ key, message, validate }, options);

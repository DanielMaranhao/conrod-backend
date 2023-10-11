import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/;

const IS_PASSWORD_KEY = 'isPassword';

const isPassword = (value: string): boolean => {
  return matches(value, PASSWORD_REGEX);
};

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
  ValidateBy(
    {
      name: IS_PASSWORD_KEY,
      validator: {
        validate: (value): boolean => isPassword(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a valid password',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );

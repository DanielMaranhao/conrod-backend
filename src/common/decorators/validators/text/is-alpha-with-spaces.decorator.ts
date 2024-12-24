import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const IS_ALPHA_WITH_SPACES_REGEX = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

const IS_ALPHA_WITH_SPACES_KEY = 'isAlphaWithSpaces';

const isAlphaWithSpaces = (value: string): boolean => {
  return matches(value, IS_ALPHA_WITH_SPACES_REGEX);
};

export const IsAlphaWithSpaces = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: IS_ALPHA_WITH_SPACES_KEY,
      validator: {
        validate: (value): boolean => isAlphaWithSpaces(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            '$property must contain only letters and spaces (no consecutive, leading or trailing)',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );

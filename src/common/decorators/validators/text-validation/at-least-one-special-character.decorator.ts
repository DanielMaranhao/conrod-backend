import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const AT_LEAST_ONE_SPECIAL_CHARACTER_REGEX = /.*[@$!%*?&].*/;

const AT_LEAST_ONE_SPECIAL_CHARACTER_KEY = 'atLeastOneSpecialCharacter';

const atLeastOneSpecialCharacter = (value: string): boolean => {
  return matches(value, AT_LEAST_ONE_SPECIAL_CHARACTER_REGEX);
};

export const AtLeastOneSpecialCharacter = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: AT_LEAST_ONE_SPECIAL_CHARACTER_KEY,
      validator: {
        validate: (value): boolean => atLeastOneSpecialCharacter(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            '$property must contain at least one special character',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );

import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const AT_LEAST_ONE_LOWERCASE_LETTER_REGEX = /.*[a-z].*/;

const AT_LEAST_ONE_LOWERCASE_LETTER_KEY = 'atLeastOneLowercaseLetter';

const atLeastOneLowercaseLetter = (value: string): boolean => {
  return matches(value, AT_LEAST_ONE_LOWERCASE_LETTER_REGEX);
};

export const AtLeastOneLowercaseLetter = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: AT_LEAST_ONE_LOWERCASE_LETTER_KEY,
      validator: {
        validate: (value): boolean => atLeastOneLowercaseLetter(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must contain at least one lowercase letter',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );

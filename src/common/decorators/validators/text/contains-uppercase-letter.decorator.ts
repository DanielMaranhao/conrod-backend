import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const CONTAINS_UPPERCASE_LETTER_REGEX = /.*[A-Z].*/;

const CONTAINS_UPPERCASE_LETTER_KEY = 'containsUppercaseLetter';

const containsUppercaseLetter = (value: string): boolean => {
  return matches(value, CONTAINS_UPPERCASE_LETTER_REGEX);
};

export const ContainsUppercaseLetter = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: CONTAINS_UPPERCASE_LETTER_KEY,
      validator: {
        validate: (value): boolean => containsUppercaseLetter(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must contain at least one uppercase letter',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );

import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const CONTAINS_LOWERCASE_LETTER_REGEX = /.*[a-z].*/;

const CONTAINS_LOWERCASE_LETTER_KEY = 'containsLowercaseLetter';

const containsLowercaseLetter = (value: string): boolean => {
  return matches(value, CONTAINS_LOWERCASE_LETTER_REGEX);
};

export const ContainsLowercaseLetter = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: CONTAINS_LOWERCASE_LETTER_KEY,
      validator: {
        validate: (value): boolean => containsLowercaseLetter(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must contain at least one lowercase letter',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );

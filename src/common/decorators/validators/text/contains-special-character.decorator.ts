import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const CONTAINS_SPECIAL_CHARACTER_REGEX = /.*[@$!%*?&].*/;

const CONTAINS_SPECIAL_CHARACTER_KEY = 'containsSpecialCharacter';

const containsSpecialCharacter = (value: string): boolean => {
  return matches(value, CONTAINS_SPECIAL_CHARACTER_REGEX);
};

export const ContainsSpecialCharacter = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: CONTAINS_SPECIAL_CHARACTER_KEY,
      validator: {
        validate: (value): boolean => containsSpecialCharacter(value),
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

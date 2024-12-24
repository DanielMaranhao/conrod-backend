import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const CONTAINS_NUMBER_REGEX = /.*[\d].*/;

const CONTAINS_NUMBER_KEY = 'containsNumber';

const containsNumber = (value: string): boolean => {
  return matches(value, CONTAINS_NUMBER_REGEX);
};

export const ContainsNumber = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: CONTAINS_NUMBER_KEY,
      validator: {
        validate: (value): boolean => containsNumber(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must contain at least one number',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );

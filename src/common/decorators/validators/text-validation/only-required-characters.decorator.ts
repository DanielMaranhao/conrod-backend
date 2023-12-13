import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from 'class-validator';

const ONLY_REQUIRED_CHARACTERS_REGEX = /^[a-zA-Z\d@$!%*?&]+$/;

const ONLY_REQUIRED_CHARACTERS_KEY = 'onlyRequiredCharacters';

const onlyRequiredCharacters = (value: string): boolean => {
  return matches(value, ONLY_REQUIRED_CHARACTERS_REGEX);
};

export const OnlyRequiredCharacters = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: ONLY_REQUIRED_CHARACTERS_KEY,
      validator: {
        validate: (value): boolean => onlyRequiredCharacters(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            '$property must contain only letters, numbers and the following special characters: @$!%*?&',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );

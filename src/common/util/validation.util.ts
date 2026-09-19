import {
  buildMessage,
  ValidateBy,
  type ValidationOptions,
} from 'class-validator';

interface ValidatorParams {
  key: string;
  message: string;
  validate: (value: string) => boolean;
}

export const createValidator = (
  { key, message, validate }: ValidatorParams,
  options?: ValidationOptions,
) =>
  ValidateBy(
    {
      name: key,
      validator: {
        validate: (value) => validate(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + message,
          options,
        ),
      },
    },
    options,
  );

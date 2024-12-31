import * as Joi from 'joi';

export const TEST_ENV_VALIDATION_SCHEMA = Joi.object({
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_HOST: Joi.required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_NAME: Joi.required(),
});

import * as Joi from 'joi';

export const TEST_ENV_VALIDATION_SCHEMA = Joi.object({
  TEST_DATABASE_USER: Joi.required(),
  TEST_DATABASE_PASSWORD: Joi.required(),
  TEST_DATABASE_HOST: Joi.required(),
  TEST_DATABASE_PORT: Joi.number().port().required(),
  TEST_DATABASE_NAME: Joi.required(),
  TEST_DATABASE_URL: Joi.required(),
});

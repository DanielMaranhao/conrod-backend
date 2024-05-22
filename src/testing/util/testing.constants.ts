import * as Joi from 'joi';

export const TEST_ENV_VALIDATION_SCHEMA = Joi.object({
  TEST_DATASOURCE_USERNAME: Joi.required(),
  TEST_DATASOURCE_PASSWORD: Joi.required(),
  TEST_DATASOURCE_HOST: Joi.required(),
  TEST_DATASOURCE_PORT: Joi.number().integer().positive().required(),
  TEST_DATASOURCE_DATABASE: Joi.required(),
  TEST_DATASOURCE_URL: Joi.required(),
});

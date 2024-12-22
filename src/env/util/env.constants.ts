import * as Joi from 'joi';

export const ENV_VALIDATION_SCHEMA = Joi.object({
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_HOST: Joi.required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_NAME: Joi.required(),
  DATABASE_URL: Joi.required(),
  JWT_SECRET: Joi.required(),
  JWT_TTL: Joi.required(),
  THROTTLER_TTL: Joi.number().integer().positive().required(),
  THROTTLER_LIMIT: Joi.number().integer().positive().required(),
});

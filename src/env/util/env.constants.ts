import * as Joi from 'joi';

export const ENV_VALIDATION_SCHEMA = Joi.object({
  DATASOURCE_USERNAME: Joi.required(),
  DATASOURCE_PASSWORD: Joi.required(),
  DATASOURCE_HOST: Joi.required(),
  DATASOURCE_PORT: Joi.number().integer().positive().required(),
  DATASOURCE_DATABASE: Joi.required(),
  DATASOURCE_URL: Joi.required(),
  JWT_SECRET: Joi.required(),
  JWT_TTL: Joi.required(),
  THROTTLER_TTL: Joi.number().integer().positive().required(),
  THROTTLER_LIMIT: Joi.number().integer().positive().required(),
});

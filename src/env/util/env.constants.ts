import * as Joi from 'joi';

export const ENV_VALIDATION_SCHEMA = Joi.object({
  APP_PORT: Joi.number().port().required(),

  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_HOST: Joi.required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_NAME: Joi.required(),

  JWT_SECRET: Joi.required(),
  JWT_TTL: Joi.required(),

  THROTTLER_TTL: Joi.number().integer().positive().required(),
  THROTTLER_LIMIT: Joi.number().integer().positive().required(),

  MAIL_PROTOCOL: Joi.valid('smtp', 'smtps').required(),
  MAIL_HOST: Joi.string().hostname().required(),
  MAIL_USER: Joi.required(),
  MAIL_PASSWORD: Joi.required(),
  MAIL_FROM: Joi.string().email().required(),
});

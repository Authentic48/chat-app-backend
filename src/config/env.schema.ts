import * as Joi from 'joi';

export const envSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().required(),
});

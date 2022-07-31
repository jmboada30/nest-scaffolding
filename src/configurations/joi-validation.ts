import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  mysql: Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_PASSWORD_ROOT: Joi.string().required(),
  }),
  JWT_SECRET: Joi.string().required(),
});

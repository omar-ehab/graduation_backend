import Joi from '@hapi/joi';

export const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  fcm_code: Joi.optional()
});
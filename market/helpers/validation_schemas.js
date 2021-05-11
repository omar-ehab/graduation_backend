const Joi = require('joi');

const createMarketSchema = Joi.object({
  name: Joi.string().required().min(3),
  createdBy: Joi.number().required().greater(0)
});

const updateMarketSchema = Joi.object({
  name: Joi.string().required().min(3)
});

const withdrawAndDepositSchema = Joi.object({
  balance: Joi.number().required().greater(0)
});

module.exports = {
  createMarketSchema,
  updateMarketSchema,
  withdrawAndDepositSchema
}
const Joi = require("joi");

const updateCardSchema = Joi.object({
  cardName: Joi.string().optional(),
  cardNumber: Joi.number().optional(),
  balance: Joi.number().optional(),
  expiryDate: Joi.number().optional(),
  deleted: Joi.boolean().optional(),
  deletedAt: Joi.string().optional(),
});

module.exports = updateCardSchema;

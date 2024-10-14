const Joi = require("joi");

const addCardSchema = Joi.object({
  cardName: Joi.string().required(),
  cardNumber: Joi.number().optional(),
  balance: Joi.number().default(0).optional(),
  expiryDate: Joi.number().required(),
});

module.exports = addCardSchema;

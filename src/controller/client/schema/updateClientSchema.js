const Joi = require('joi');

const clientUpdateSchema = Joi.object({
  name: Joi.string().trim(),
  lastName: Joi.string().trim(),
  balance: Joi.number().min(0),
  phoneNumber: Joi.string().optional(),
  email: Joi.string().email().lowercase().trim(),
  address: Joi.string().trim(),
  companyName: Joi.string().trim(),
  inn: Joi.string().trim(),
  bankAccount: Joi.number(),
  status: Joi.number().valid(0, 1, 2),
});

module.exports = clientUpdateSchema;

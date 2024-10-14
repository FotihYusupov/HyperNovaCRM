const Joi = require('joi');

const clientSchema = Joi.object({
  name: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  balance: Joi.number().default(0),
  phoneNumber: Joi.string().optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .trim()
    .required(),
  address: Joi.string().trim().optional(),
  companyName: Joi.string().trim().optional(),
  inn: Joi.string().trim().optional(),
  bankAccount: Joi.number().optional(),
  status: Joi.number().default(1).valid(1, 2, 3)
});

module.exports = clientSchema;

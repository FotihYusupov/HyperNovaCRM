const Joi = require("joi");

const addBankSchema = Joi.object({
  bankName: Joi.string().required(),
  accountNumber: Joi.number().optional(),
  balance: Joi.number().optional().default(0)
});

module.exports = addBankSchema;

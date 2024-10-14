const Joi = require("joi");

const updateBankSchema = Joi.object({
  bankName: Joi.string().optional(),
  accountNumber: Joi.number().optional(),
});

module.exports = updateBankSchema;

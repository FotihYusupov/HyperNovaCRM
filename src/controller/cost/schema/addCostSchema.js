const Joi = require('joi');

const addCostSchema = Joi.object({
  name: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  project: Joi.string().length(24).hex().required(),
});

module.exports = addCostSchema;

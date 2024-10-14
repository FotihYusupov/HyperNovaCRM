const Joi = require('joi');

const updateCostSchema = Joi.object({
  name: Joi.string().trim().optional(),
  amount: Joi.number().positive().optional(),
  project: Joi.string().length(24).hex().optional(),
})

module.exports = updateCostSchema;

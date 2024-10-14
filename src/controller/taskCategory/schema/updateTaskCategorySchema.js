const Joi = require('joi');

const updateTaskCategorySchema = Joi.object({
  name: Joi.string().trim().required(),
  project: Joi.string().length(24).hex().required(),
  color: Joi.string().hex().optional(),
});

module.exports = updateTaskCategorySchema;

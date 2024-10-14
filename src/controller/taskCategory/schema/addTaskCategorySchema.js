const Joi = require('joi');

const addTaskCategorySchema = Joi.object({
  name: Joi.string().trim().required(),
  project: Joi.string().length(24).hex().required(),
  color: Joi.string().hex().optional(),
});

module.exports = addTaskCategorySchema;
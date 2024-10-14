const Joi = require("joi");

const updateProjectSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim().allow(""),
  client: Joi.string().length(24).hex(),
  status: Joi.number().valid(1, 2, 3, 4),
  priority: Joi.number().valid(1, 2, 3).default(2),
  startDate: Joi.number().integer().min(0).allow(null),
  endDate: Joi.number().integer().min(0).allow(null),
  workDays: Joi.number().min(0),
  price: Joi.number().min(0),
  paid: Joi.number().min(0),
  links: Joi.array().items(
    Joi.object({
      name: Joi.string().trim(),
      link: Joi.string().uri(),
    })
  ),
});

module.exports = updateProjectSchema;

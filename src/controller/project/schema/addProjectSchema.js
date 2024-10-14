const Joi = require("joi");

const addProjectSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().allow(""),
  client: Joi.string().length(24).hex().required(),
  status: Joi.number().valid(1, 2, 3, 4).default(1),
  priority: Joi.number().valid(1, 2, 3).default(2),
  startDate: Joi.number().integer().min(0),
  endDate: Joi.number().integer().min(0),
  workDays: Joi.number().min(0),
  price: Joi.number().min(0).default(0),
  paid: Joi.number().min(0).default(0),
  members: Joi.array().items(Joi.string().length(24).hex()),
  links: Joi.array().items(
    Joi.object({
      name: Joi.string().trim(),
      link: Joi.string().uri(),
    })
  ),
});

module.exports = addProjectSchema;

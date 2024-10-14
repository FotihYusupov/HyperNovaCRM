const Joi = require("joi");

const addRoleSchema = Joi.object({
  name: Joi.string().optional(),
  assess: Joi.array().optional(),
});

module.exports = addRoleSchema;

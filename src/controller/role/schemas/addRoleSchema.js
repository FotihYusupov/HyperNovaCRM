const Joi = require("joi");

const addRoleSchema = Joi.object({
  name: Joi.string().required(),
  assess: Joi.array().required(),
});

module.exports = addRoleSchema;

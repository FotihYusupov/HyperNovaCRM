const Joi = require("joi");

const loginUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = loginUserSchema;

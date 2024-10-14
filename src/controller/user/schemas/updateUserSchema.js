const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string().alphanum().optional(),
  lastName: Joi.string().alphanum().optional(),
  balance: Joi.number().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  passportSeries: Joi.string().pattern(/^[A-Za-z]{2}[0-9]{7}$/).optional(),
  cardNumber: Joi.number().optional(),
  address: Joi.string().optional(),
  login: Joi.string().optional(),
  password: Joi.string().optional(),
  salary: Joi.number().optional(),
  gender: Joi.number().optional(),
  dateBirth: Joi.number().optional(),
  bot: Joi.number().optional(),
  username: Joi.string().optional(),
  role: Joi.string().optional(),
  active: Joi.number().optional()
});

module.exports = updateUserSchema;

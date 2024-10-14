const Joi = require('joi');
const moment = require('moment');

const userSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  balance: Joi.number().default(0).optional(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().optional(),
  passportSeries: Joi.string().pattern(/^[A-Za-z]{2}[0-9]{7}$/).optional(),
  cardNumber: Joi.number().optional(),
  address: Joi.string().optional(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  salary: Joi.number().optional(),
  gender: Joi.number().optional(),
  dateBirth: Joi.number().max(moment().valueOf()).optional(),
  bot: Joi.number().default(2),
  username: Joi.string().optional(),
  role: Joi.string().required(),
  active: Joi.number().optional().default(1),
});

module.exports = userSchema;

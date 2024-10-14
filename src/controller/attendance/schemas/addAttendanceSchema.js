const Joi = require("joi");

const addAttendanceSchema = Joi.object({
  user: Joi.string().required(),
  time: Joi.string().required(),
});

module.exports = addAttendanceSchema;

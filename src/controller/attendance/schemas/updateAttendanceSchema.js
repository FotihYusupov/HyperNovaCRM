const Joi = require("joi");

const updateAttendanceSchema = Joi.object({
  user: Joi.string().optional(),
  date: Joi.number().optional(),
  clockIn: Joi.string().optional(),
  clockOut: Joi.string().optional(),
});

module.exports = updateAttendanceSchema;

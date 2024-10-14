const Joi = require("joi");

const addNoteSchema = Joi.object({
  client: Joi.string().required(),
  content: Joi.string().trim().required(),
  important: Joi.boolean().default(false),
  deadline: Joi.number().optional(),
});

module.exports = addNoteSchema;

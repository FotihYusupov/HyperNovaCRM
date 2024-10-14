const Joi = require("joi")

const updateNoteSchema = Joi.object({
  client: Joi.string().optional(),
  content: Joi.string().trim().optional(),
  important: Joi.boolean().optional(),
  deadline: Joi.number().optional(),
});

module.exports = updateNoteSchema;

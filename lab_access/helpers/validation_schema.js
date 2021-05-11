const Joi = require('joi');

const recordLabEtranceSchema = Joi.object({
  student_id: Joi.string().required(),
  lab_name: Joi.string().required(),
});

module.exports = {
  recordLabEtranceSchema
}
const Joi = require('joi');

const recordAttendanceSchema = Joi.object({
  student_id: Joi.string().required(),
  student_name: Joi.string().required(),
  lecture_id: Joi.string().required(),
});

module.exports = {
  recordAttendanceSchema
}
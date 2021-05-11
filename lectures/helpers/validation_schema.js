const Joi = require('joi');

const startOfDay = new Date();
startOfDay.setHours(0,0,0,0);

const createLectureSchema = Joi.object({
  name: Joi.string().required().min(3),
  class: Joi.string().required().min(3),
  doctor_id: Joi.number().required(),
});

module.exports = {
  createLectureSchema
}
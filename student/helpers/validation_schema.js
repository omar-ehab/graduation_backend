const Joi = require('joi');
const { Student } = require('../models');
const { Op } = require("sequelize");

const createStudentScheme = Joi.object({
  card_id: Joi.string().required(),
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  birth_date: Joi.date().iso().required(),
  student_phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  parent_phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
});

const updateFcmCode = Joi.object({
  fcm_code: Joi.string().required()
});

const updateStudentScheme = Joi.object({
  // card_id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  birth_date: Joi.date().required(),
  student_phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  parent_phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
});

const valid_unique_values = async ({card_id, email, student_phone_number, parent_phone_number}, old_card_id) => {
  try {
    const new_card_id = card_id;
    let student;
    if(old_card_id !== new_card_id) {
      student = await Student.findOne({where: {card_id: new_card_id}})
      if(student) {
        return {
          success: false,
          message: "card id must be unique"
        }
      }
    }

    student = await Student.findOne({where: {email, card_id: {
      [Op.ne]: old_card_id
    }}})

    if(student){
      return {
        success: false,
        message: "email must be unique"
      }
    }
    student = await Student.findOne({where: {student_phone_number, card_id: {
      [Op.ne]: old_card_id
    }}});
    if(student){
      return {
        success: false,
        message: "student phone number must be unique"
      }
    }
    student = await Student.findOne({where: {parent_phone_number, card_id: {
      [Op.ne]: old_card_id
    }}});
    if(student){
      return {
        success: false,
        message: "parent phone number must be unique"
      }
    }

    return true;
  } catch(err){
    console.error(err);
  }
}

module.exports = {
  createStudentScheme,
  updateStudentScheme,
  valid_unique_values,
  updateFcmCode
}
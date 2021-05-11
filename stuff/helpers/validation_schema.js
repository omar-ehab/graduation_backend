const Joi = require('joi');
const { Staff } = require('../models');
const { Op } = require("sequelize");

const createStaffScheme = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  job_title: Joi.string().required().min(3),
  phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required()
});

const updateStaffScheme = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email(),
  job_title: Joi.string().required().min(3),
  phone_number : Joi.string().length(11).pattern(/^[0-9]+$/)
});


const valid_unique_values = async ({id, email, phone_number}) => {
  let staff = null;
  if(email){
    staff = await Staff.findOne({where: {email, id: {
      [Op.ne]: id
    }}});
    if(staff){
      return {
        success: false,
        message: "email must be unique"
      }
    }
  }
  if(phone_number) {
    staff = await Staff.findOne({where: {phone_number, id: {
      [Op.ne]: id
    }}});
    if(staff){
      return {
        success: false,
        message: "staff phone number must be unique"
      }
    }
  }

  return true;
}

module.exports = {
  createStaffScheme,
  updateStaffScheme,
  valid_unique_values,
}
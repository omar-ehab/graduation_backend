const db = require("../models");
//const Doctor = db.doctors;
const bcrypt = require('bcrypt');
/* const { loginValidation, registerValidation } = require('../validation/validation') */
//const jwt = require('jsonwebtoken');
const Joi = require('joi');
// const  Joi  = require("express-validation");


// create a doctor
exports.create = async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required(),
        phone_number: Joi.string().required(),
        password: Joi.string().required()
    });

    const validate = Joi.validate(req.body, schema);
    console.log(validate);
    if (validate.error) {
        res.status(400).send(validate.error);

        return;
    }

    //  email exist ?

    const emailExist = await db.Doctor.findOne({ where: { email: req.body.email } })
    if (emailExist)
        return res.send({ "email": false })


    // HASH THE PASSWORD
    // const salt = await bcrypt.genSaltSync(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Save to MySQL database

    db.Doctor.create({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
    }).then(doctor => {
        res.json({ success: true, doctor });
    });

};

// read a doctor by ID
exports.show = async (req, res) => {

    const doctor = await db.Doctor.findOne({ where: { id: req.params.id } });
    if (!doctor)
        return res.status(404).json({ success: false, message: "Not found !" });
    res.json({ success:true, doctor });

};

// read a doctor by email
exports.readByEmail = async (req, res) => {
    const doctor = await db.Doctor.findOne({ where: { email: req.params.email } })
    if (!doctor)
        return res.status(404).json({ success: false, message: "Not found !" });
    res.json({ success:true, doctor });

};

// read all doctors
exports.index = async (req, res) => {
    const doctors = await db.Doctor.findAll()
    res.json({ success: true, doctors });
};

//update

exports.update = async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3),
        email: Joi.string(),
        phone_number: Joi.string(),
    });

    const validate = Joi.validate({ name: req.body.name, email: req.body.email, phone_number: req.body.phone_number }, schema);
    console.log(validate);
    if (validate.error) {
        //bad request
        res.status(400).send(validate.error);

        return;
    }
    const doctor = await db.Doctor.findOne({ where: { id: req.params.id } })
    if (!doctor)
        //user not found
        return res.status(404).send("Doctor not found!")

    //find & update
    db.Doctor.update({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone,
    }, { where: { id: req.params.id } }).then(doctor => {
        res.json({ success: true });
    });
};

exports.delete = async (req, res) => {

    const doctor = await db.Doctor.findOne({ where: { id: req.params.id } })
    if (!doctor)
        //doctor not found
        return res.status(404).send("Doctor not found!");
    try {
        await doctor.destroy();
        return res.json({ success: true, message: 'user deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: 'something went wrong' });
    }
};

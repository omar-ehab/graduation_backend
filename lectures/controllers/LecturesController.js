const Lecture = require("../models/Lecture");
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const { createLectureSchema } = require('../helpers/validation_schema');


const index =  async (req, res) => {
  try{

    const lectures = await Lecture.find({doctor_id: req.params.doctor_id}).sort({date: -1});

    res.json({'success':true, lectures});
   } catch(error) {
     res.status(500).json({ success: false, error});
  }
}

const create =  async (req, res) => {
  try{
    const uuid = uuidv4();
    const lecture_qr = await QRCode.toDataURL(uuid);

    const result = await createLectureSchema.validateAsync(req.body);

    const lecture = await Lecture.create({
        name :result.name,
        class :result.class,
        doctor_id :result.doctor_id,
        lecture_qr_id: uuid,
        qr: lecture_qr,
        date: new Date()
    });

    res.json({'success':true, lecture});
   } catch(error) {
     
     if(error.isJoi === true) {
       res.status(422).json({ success: false, error});
    } else {
      res.status(500).json({ success: false, error});
    }
  }
}

module.exports = {
  index,
  create
}
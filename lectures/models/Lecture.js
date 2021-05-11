const mongoose = require('mongoose');


const LectureSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true, 
  },
  class:{
    type: String,
    required: true, 
  },
  doctor_id:{
    type: Number,
    required: true,
   
  },
  qr:{
    type: String,
    required: true, 
  },
  date:{
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model('Lecture', LectureSchema)
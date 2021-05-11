const mongoose = require('mongoose');


const attendaceRecordSchema = new mongoose.Schema({

  lecture_id:{
    type: String,
    required: true,
  },

  student_id:{
    type: String,
    required: true, 
  },
  
  student_name:{
    type: String,
    required: true, 
  },
  date:{
    type: Date,
    default: Date.now
  },

 
});



module.exports = mongoose.model('attendance_record', attendaceRecordSchema)
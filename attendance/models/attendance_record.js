const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const attendaceRecordSchema = new mongoose.Schema({

  lecture_id:{
    type: String,
    required: true,
    index: true
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
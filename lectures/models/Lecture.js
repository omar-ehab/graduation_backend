const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


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
  lecture_qr_id:{
    type: String,
    required: true,
    index: true
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
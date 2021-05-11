const AttendanceRecord = require("../models/attendance_record");
const { recordAttendanceSchema } = require('../helpers/validation_schema');


const record = async (req, res) =>{
  try{
    const result = await recordAttendanceSchema.validateAsync(req.body);
    await AttendanceRecord.create({
        lecture_id :result.lecture_id,
        student_id :result.student_id,
        student_name : result.student_name,
    });
    res.send({'success': true});
   }catch(error){
    console.error(error);
     res.status(500).json({ success: false, error});
  }
}


const getRecordsByLectureId = async (req, res) => {
  try {
      const attendance_records = await AttendanceRecord.find({lecture_id: req.params.lecture_id});
      const data = [];
      

      attendance_records.forEach(attendance_record => {
        data.push({
          student_id: attendance_record.student_id,
          student_name: attendance_record.student_name,
          date: attendance_record.date
        })
      });

      res.json({ success: true, records: data})
  } catch (error) {
    console.error(error);
    res.status(500).send({success: false, error});
  }
}


module.exports = {
  record,
  getRecordsByLectureId
}
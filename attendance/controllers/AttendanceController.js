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

      const absense_students = [
        {
          student_id: 'ABC-325678',
          student_name: 'Yousry Ahmed Alaa',
          date: null
        },
        {
          student_id: 'ABC-388678',
          student_name: 'Waleed Abdallah Mohamed',
          date: null
        },
        {
          student_id: 'ABC-543215',
          student_name: 'Lamiaa Emad Aly',
          date: null
        },
        {
          student_id: 'ABC-984313',
          student_name: 'Farah Yousry Mamdouh',
          date: null
        },
        {
          student_id: 'ABC-987432',
          student_name: 'Mohamed Gamal Ahmad',
          date: null
        }
      ];

      for(i = 0; i < absense_students.length; i++) {
        data.push(absense_students[i]);
      }

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
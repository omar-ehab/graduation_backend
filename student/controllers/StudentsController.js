const { Student } = require('../models');
const { createStudentScheme, updateStudentScheme, updateFcmCode, valid_unique_values } = require('../helpers/validation_schema');

const index = async (req, res) => {
  try {
    const students = await Student.findAll();
    return res.json({
        success: true,
        students
    });
  } catch (err) {
    if(err.isJoi){
      res.status(422).json({
        success: false,
        error: err
      });
    }
    return res.status(500).json({ error: process.env.NODE_ENV === 'development' ? err : "Something went wrong"});
  }
}

const store = async (req, res) => {
  try {
    const result = await createStudentScheme.validateAsync(req.body);
    const validated = await valid_unique_values(result);
    if(validated === true) {
      const student = await Student.create(result)
      delete student.password;
      return res.json({
        success: true,
        student
      });
    } else {
      res.status(422).json(validated)
    }
  } catch (err) {
    if(err.isJoi){
      res.status(422).json({
        success: false,
        error: err
      });
    }
    return res.status(500).json({ error: process.env.NODE_ENV === 'development' ? err : "Something went wrong"});
  }
}

const show = async (req, res) => {
  const id = req.params.id;
  try {
      const student = await Student.findOne({
          where: { id }
      });
      return res.json({
        success: true,
        student
      });
  } catch (err) {
    if(err.isJoi){
      res.status(422).json({
        success: false,
        error: err
      });
    }
    return res.status(500).json({ error: process.env.NODE_ENV === 'development' ? err : "Something went wrong"});
  }
}

const readByEmail = async (req, res) => {
  const email = req.params.email

  try {
    const student = await Student.findOne({
        where: { email }
    });

    return res.json({ success: true, student});
  } catch (err) {
    if(err.isJoi){
      res.status(422).json({
        success: false,
        error: err
      });
    }
    return res.status(500).json({ success: false, error: 'something went WRONG' })
  }
}

const update = async (req, res) => {
  try {
  const id = req.params.id
  const result = await updateStudentScheme.validateAsync(req.body);
  const validated = await valid_unique_values(result);
  if(validated === true) {
    const student = await Student.findOne({ where: { id } })
    if(student) {
      // student.card_id = result.card_id;
      student.name = result.name;
      student.email = result.email;
      student.birth_date = result.birth_date;
      student.student_phone_number = result.student_phone_number;
      student.parent_phone_number = result.parent_phone_number;
      await student.save();

      return res.json({
        success: true,
        student
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Not Found !"
      });
    }
  }

  } catch (err) {
    if(err.isJoi){
      res.status(422).json({
        success: false,
        error: err
      });
    }
    return res.status(500).json({ error: process.env.NODE_ENV === 'development' ? err : "Something went wrong"});
  }
}

const destroy = async (req, res) => {
  const id = req.params.id
  try {
    const student = await Student.findOne({ where: { id } })
    await student.destroy()

    return res.json({ success: true, message: 'STUDENT DELETED' });
  } catch (err) {
    if(err.isJoi){
      res.status(422).json({
        success: false,
        error: err
      });
    }
    return res.status(500).json({ error: process.env.NODE_ENV === 'development' ? err : "Something went wrong"});
  }
}

const updateFcm = async (req, res) => {
  try{
    const result = await updateFcmCode.validateAsync(req.body);
    const email = req.params.email;
    const student = await Student.update({fcm_code: result.fcm_code}, {where: {email}});
    if(student[0]){
      res.json({success: true, message: "fcm code updated successfully"});
    } else {
      res.status(404).send("Not Found");
    } 
  } catch(err){
    console.log(err);
    if(err.isJoi){
      res.status(422).json({
        success: false,
        error: err.message
      });
    }
    res.status(500).json({ error: process.env.NODE_ENV === 'development' ? err : "Something went wrong"});
  }
}


module.exports = {
  index,
  store,
  show,
  update,
  destroy,
  readByEmail,
  updateFcm
}

const express = require("express");
const router = express.Router();

const AttendanceController = require('../controllers/AttendanceController');

// insert attendance record
router.post("/record", AttendanceController.record);

//sheet generation
router.get('/:lecture_id', AttendanceController.getRecordsByLectureId);

module.exports =  router;
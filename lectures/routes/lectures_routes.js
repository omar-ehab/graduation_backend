const express = require("express");
const router = express.Router();
const LecturesController = require('../controllers/LecturesController');

router.get("/:doctor_id", LecturesController.index);
router.post("/", LecturesController.create);

module.exports =  router;
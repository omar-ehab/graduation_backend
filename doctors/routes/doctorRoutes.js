const express = require("express");
const router = express.Router();


const doctorControllers = require("../controllers/doctorControllers");

// read all doctors
router.get("/", doctorControllers.index);

// read doctor by ID
router.get("/:id", doctorControllers.show);

// create doctor
router.post("/", doctorControllers.create);

// update doctor
router.put("/:id/update", doctorControllers.update);

// delete doctor
router.delete("/:id/destroy", doctorControllers.delete);

// read doctor by email
router.get("/:email/read_by_email", doctorControllers.readByEmail);



module.exports = router;
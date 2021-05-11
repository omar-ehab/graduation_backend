const express = require('express')
const router = express.Router()

const StaffController = require('../controllers/StaffController')

//show all staff
router.get('/', StaffController.index);
//create staff
router.post('/', StaffController.store);
//fine one staff by id
router.get('/:id', StaffController.show);
//fine one staff by email
router.get('/:email/read_by_email', StaffController.readByEmail);
//update staff
router.put('/:id/update', StaffController.update);
//delete staff
router.delete('/:id/destroy', StaffController.destroy);

module.exports = router;
const router = require('express').Router();
const StudentsController = require('../controllers/StudentsController');

//SHOW ALL STUDENTS
router.get('/', StudentsController.index);
//CREATE STUDENT
router.post('/', StudentsController.store)
//FIND ONE STUDENT BY CARD ID
router.get('/:id', StudentsController.show);
//fine one stuff by email
router.get('/:email/read_by_email', StudentsController.readByEmail);
//UPDATE STUDENT
router.put('/:id/update', StudentsController.update);
//DELETE STUDENT
router.delete('/:id/destroy', StudentsController.destroy);

router.put('/:email/update_fcm', StudentsController.updateFcm);

module.exports = router;

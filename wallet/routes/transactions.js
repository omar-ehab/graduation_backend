const router = require('express').Router();

const controller = require('../controllers/TransactionsController');

router.post('/:wallet_id/storeGarageGateTransaction', controller.storeGarageGateTransaction);
router.post('/:wallet_id/storeTransaction', controller.store);
router.get('/:id/showTransaction', controller.show);
router.put('/:id/acceptTransaction',controller.accept);
router.put('/:id/rejectTransaction', controller.reject);
router.get('/students/:student_id/Transaction', controller.studentTransactions);
router.get('/other/:other_id/Transaction', controller.otherTransactions);
router.get('/other/:other_id/data', controller.getOtherIdData);







module.exports = router
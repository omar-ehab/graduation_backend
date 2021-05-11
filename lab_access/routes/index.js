const express = require('express');
const router = express.Router();
const labAccessController = require('../controllers/labAccessController');

router.post('/store_access_log', labAccessController.store_access);

router.get('/', labAccessController.get_distincet_labs);

router.get('/get_excel_data/:lab_name', labAccessController.get_excel_data);

module.exports = router;
const express = require("express");
const router = express.Router();

const notificationController = require('../controllers/NotificationsController');

router.get('/', notificationController.getNotificationTypes);
router.post('/push_notification/:fcm_token/:notification_type', notificationController.notifyUser);
router.post('/send_to_all/:notification_type', notificationController.sendToAll);
router.post('/in_app_notification/:fcm_token/:notification_type', notificationController.createNotification);

module.exports = router;
import express from 'express';
import NotificationsController from '../controllers/NotificationsController.js';


class NotificationsRoutes {
  constructor(serviceRegistry) {
    this.router = express.Router();
    this.controller = new NotificationsController(serviceRegistry);
  }
  
  routes = () => {

    this.router.get('/', this.controller.index);
    
    this.router.post('/notify_user/:fcm_token/:notification_type', this.controller.notifyUser);

    this.router.post('/notify_all_users/:notification_type', this.controller.notifyAllUsers);

    return this.router;
  }
}

export default NotificationsRoutes;
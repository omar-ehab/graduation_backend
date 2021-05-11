import NotificationService from '../ServicesModels/NotificationService.js';
class NotificationsController{
  constructor(serviceRegistry){
    this.notificationService = new NotificationService(serviceRegistry);
  }

  index = async (req, res) => {
    try {
      const response = await this.notificationService.fetchData("index");
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.send(err.message);
    }
  }

  notifyUser = async (req, res) => {
    try {
      await this.notificationService.fetchData("pushNotification", req.params);
      const in_app_response = await this.notificationService.fetchData("inAppNotification", req.params);
      if(in_app_response){
          res.json({success:true, message: "notification sent successfully"});
      } else {
        res.sendStatus(500);
      }
    } catch(err){
      res.send(err.message);
    }
  }

  notifyAllUsers = async (req, res) => {
    try {
      const response = await this.notificationService.fetchData("sendToAll", req.params);
      if(response?.data.success) {
          res.json({success:true, message: "notification sent successfully"});
      } else {
        res.sendStatus(500);
      }
    } catch(err){
      res.send(err.message);
    }
  }


  

}

export default NotificationsController;



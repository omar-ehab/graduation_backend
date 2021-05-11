const axios = require('axios');

class Notification {
  constructor(){
    this.notifications = {
      confirmPurchase_notification: {
          title: 'Confirm Purchase Process',
          text: 'Please Confrim your purchase process'
      },
      purchaseComplete_notification: {
          'title': 'Purchase Process Complete',
          'text': 'Purchase process has been completed successfully'
      },
      walletRecharged_notification: {
          'title': 'Wallet Recharged',
          'text': 'Wallet recharging process has been completed successfully'
      },
      attendance_notification: {
          'title': 'Attendance Recorded',
          'text': 'Attendance has been recorded successfully'
      },
      pointsAdded_notification: {
          'title': 'Reward Points Added',
          'text': 'Reward Points has been Added successfully'
      },
      promoCode_notification: {
          'title': 'New promo code',
          'text': 'Reward Points has been Added successfully'
      },
    };
  }

  getAll = () => {
    return this.notifications;
  }

  get = (key) => {
      return this.notifications[key];
  }

  pushNoitification = async (notification_body) => {
    return axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Authorization': 'key=AAAAFC6ZEaI:APA91bHwjIWebuyBa1TQhCU7YWe14f6jiX4wNJLvz20swrPWcDbJVO-wWdxUIgFrEoCm3G9bPY7xuRv4IIPLYq-rddXCmPDWD4Z3N6P-KSBAjJUGt9tM8b0_WXJzuB2O-j_1FATg5ItY',
        'Content-Type': 'application/json'
      },
      data: notification_body
    });
  }
}

module.exports = Notification;
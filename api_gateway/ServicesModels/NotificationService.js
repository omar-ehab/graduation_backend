import { replacingPathParams } from '../helpers/url.js';
import axios from 'axios';
class NotificationService {
  constructor(serviceRegistry) {
    this.serviceRegistry = serviceRegistry
    this.pathes = {
      index: {
        method: "get",
        path: "/"
      },
      pushNotification: {
        method: "post",
        path: '/push_notification/:fcm_token/:notification_type'
      },
      sendToAll: {
        method: "post",
        path: '/send_to_all/:notification_type'
      },
      inAppNotification: {
        method: "post",
        path: '/in_app_notification/:fcm_token/:notification_type'
      }
    };
  }

  async getUrl(pathName, params = {}) {
    try{
      const { ip, port } = await this.serviceRegistry.get('notifications', '1');
      const host = `http://${ip}:${port}`;
      const originalPath = this.pathes[pathName];
      return replacingPathParams(host, originalPath, params);
    } catch(err){
      return 404;
    }
  }

  async fetchData(pathName, params = {}, body = {}) {
    const config = await this.getUrl(pathName, params);

    

    if(config === 404)
      return false;
    config['data'] = {...body}
    return axios(config);
  }
}

export default NotificationService
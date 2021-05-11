import { replacingPathParams } from '../helpers/url.js';
import axios from 'axios';
class PurchaseService {
  constructor(serviceRegistry) {
    this.serviceRegistry = serviceRegistry
    this.pathes = {
      convertPoints: {
        method: "put",
        path: '/convertPoints'
      },
      purchase: {
        method: "post",
        path: '/:student_id/purchase'
      },
    };
  }

  getUrl(pathName, params = {}) {
    try{
      const { ip, port } = this.serviceRegistry.get('purchase_service', '1');
      const host = `http://${ip}:${port}`;
      const originalPath = this.pathes[pathName];
      return replacingPathParams(host, originalPath, params);
    } catch(err){
      return 404;
    }
  }

  fetchData(pathName, params = {}, body = {}) {

    const config = this.getUrl(pathName, params);

    if(config === 404)
      return false;
    config['data'] = {...body}
    return axios(config);
  }
}

export default PurchaseService

  
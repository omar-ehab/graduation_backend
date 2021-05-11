import { replacingPathParams } from '../helpers/url.js';
import axios from 'axios';
class MarketService {
  constructor(serviceRegistry) {
    this.serviceRegistry = serviceRegistry
    this.pathes = {
      index: {
        method: "get",
        path: "/"
      },
      show: {
        method: "get",
        path: '/:id'
      },
      store: {
        method: "post",
        path: '/'
      },
      update: {
        method: "put",
        path: '/:id/update'
      },
      destroy: {
        method: "delete",
        path: '/:id/destroy'
      },
      deposit: {
        method: "post",
        path: '/:id/deposit'
      },
      withdraw: {
        method: "post",
        path: '/:id/withdraw'
      },
    };
  }

  async getUrl(pathName, params = {}) {
    try{
      const { ip, port } = await this.serviceRegistry.get('markets', '1');
      const host = `http://${ip}:${port}`;
      const originalPath = this.pathes[pathName];
      return replacingPathParams(host, originalPath, params);
    } catch(err){
      console.log(err);
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

export default MarketService;
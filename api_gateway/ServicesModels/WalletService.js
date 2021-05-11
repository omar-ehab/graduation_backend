import { replacingPathParams } from '../helpers/url.js';
import axios from 'axios';
class WalletService {
  constructor(serviceRegistry) {
    this.serviceRegistry = serviceRegistry
    this.pathes = {
      //////////////////////////////////////////////wallet///////////////////////////////////////////////////
      create: {
        method: "post",
        path: '/'
      },
      getWalletByStudentId: {
        method: "get",
        path: '/:card_id'
      },
      deposit: {
        method: "put",
        path: '/:card_id/deposit'
      },
      withdraw: {
        method: "put",
        path: '/:card_id/withdraw'
      },
      convertPoints: {
        method: "put",
        path: '/:card_id/convertPoints'
      },

      ///////////////////////////////////////////////transactions////////////////////////////////////////////
      store: {
        method: "post",
        path: '/:wallet_id/storeTransaction'
      },
      show: {
        method: "get",
        path: '/:id/showTransaction'
      },
      accept: {
        method: "put",
        path: '/:id/acceptTransaction'
      },
      reject: {
        method: "put",
        path: '/:id/rejectTransaction'
      },
      studentTransactions: {
        method: "get",
        path: '/students/:student_id/Transaction'
      },
      otherTransactions: {
        method: "get",
        path: '/other/:other_id/Transaction'
      },
    };
  }

  async getUrl(pathName, params = {}) {
    try{
      const { ip, port } = await this.serviceRegistry.get('wallet', '1');
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

export default WalletService

 
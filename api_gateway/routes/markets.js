import express from 'express';
import MarketsController from '../controllers/MarketsController.js';

class marketRoutes {
    constructor(serviceRegistry) {
      this.router = express.Router();
      this.controller = new MarketsController(serviceRegistry);
    }
    
    routes = () => {
      this.router.get('/', this.controller.index);
  
      this.router.get('/:id', this.controller.show);
  
      this.router.post('/', this.controller.store);
  
      this.router.put('/:id/update', this.controller.update);
  
      this.router.delete('/:id/destroy', this.controller.destroy);

      this.router.post('/:id/deposit', this.controller.deposit);

      this.router.post('/:id/withdraw', this.controller.withdraw);

  
      return this.router;
    }
  }
  
  export default marketRoutes;

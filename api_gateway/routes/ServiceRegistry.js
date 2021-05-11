import express from 'express';
import ServiceRegistryController from '../controllers/ServiceRegistryController.js';


class ServiceRegistryRoutes {
  
  constructor(serviceRegistry) {
    this.router = express.Router();
    this.controller = new ServiceRegistryController(serviceRegistry);
  }
  
  routes = () => {
    this.router.put('/register/:name/:version/:port', this.controller.store);
    this.router.delete('/unregister/:name/:version/:port', this.controller.destroy);
    return this.router;
  }
}

export default ServiceRegistryRoutes;
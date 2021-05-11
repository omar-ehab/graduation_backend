import express from 'express';
import DoctoresController from '../controllers/DoctorsController.js';


class DoctorRoutes {
  constructor(serviceRegistry) {
    this.router = express.Router();
    this.controller = new DoctoresController(serviceRegistry);
  }
  
  routes = () => {
    this.router.get('/', this.controller.index);

    this.router.get('/:id', this.controller.show);

    this.router.post('/', this.controller.store);

    this.router.put('/:id/update', this.controller.update);

    this.router.delete('/:id/destroy', this.controller.destroy);

    return this.router;
  }
}

export default DoctorRoutes;
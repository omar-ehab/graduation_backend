import express from 'express';
import LabsController from '../controllers/LabsController.js';


class labRoutes {
    constructor(serviceRegistry) {
      this.router = express.Router();
      this.controller = new LabsController(serviceRegistry);
    }
    
    routes = () => {
      this.router.post('/store_access_log', this.controller.store_access);
  
      this.router.get('/',this.controller.get_distincet_labs);
      this.router.get('/download_excel/:lab_id', this.controller.download_excel);
  
      return this.router;
    }
  }
  export default labRoutes;
  
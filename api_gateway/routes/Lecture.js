import express from 'express';
import LecturesController from '../controllers/LecturesController.js';

class LectureRoutes {
    constructor(serviceRegistry) {
      this.router = express.Router();
      this.controller = new LecturesController(serviceRegistry);
    }
    
    routes = () => {
      this.router.get('/:doctor_id',this.controller.index);
      this.router.post('/',this.controller.store);
      return this.router;
    }
  }
  
  export default LectureRoutes;







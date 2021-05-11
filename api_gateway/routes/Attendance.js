import express from 'express';
import AttendanceController from '../controllers/AttendanceController.js';


class AttendanceRoutes {
    constructor(serviceRegistry) {
      this.router = express.Router();
      this.controller = new AttendanceController(serviceRegistry);
    }
    
    routes = () => {
        this.router.post('/lectures/record_attendance',this.controller.record);
        this.router.get('/lectures/:lecture_id/download',this.controller.download);
  
      return this.router;
    }
  }

  export default AttendanceRoutes;
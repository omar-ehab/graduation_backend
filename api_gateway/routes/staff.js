import express from 'express';
import StaffController from '../controllers/StaffController.js';



class staffRoutes {
    constructor(serviceRegistry) {
      this.router = express.Router();
      this.controller = new StaffController(serviceRegistry);
    }
    
    routes = () => {
        this.router.get('/', this.controller.index);

        this.router.get('/:id', this.controller.show);

        this.router.get('/:email/read_by_email', this.controller.findByEmail);
        
        this.router.post('/', this.controller.store);
        
        this.router.put('/:id/update', this.controller.update);
        
        this.router.delete('/:id/destroy', this.controller.destroy);
  
      return this.router;
    }
  }
  
  export default staffRoutes;

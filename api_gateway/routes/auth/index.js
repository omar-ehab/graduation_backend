import express from 'express';
import AuthController from '../../controllers/auth/AuthController.js';

class AuthRoutes{
  constructor(serviceRegistry) {
    this.router = express.Router();
    this.controller = new AuthController(serviceRegistry);
  }

  routes = () => {
    this.router.post('/:type/login', this.controller.login);
    this.router.post('/refresh', this.controller.refresh);
    this.router.post('/logout', this.controller.logout);

    return this.router;
  }
}



export default AuthRoutes;
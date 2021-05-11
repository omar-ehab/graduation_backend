import express from 'express';
import WalletsController from '../controllers/WalletsController.js';


class WalletRoutes {
    constructor(serviceRegistry) {
      this.router = express.Router();
      this.controller = new WalletsController(serviceRegistry);
    }
    
    routes = () => {
      //wallet
        this.router.post('/', this.controller.create);

        this.router.get('/:card_id', this.controller.getWalletByStudentId);
        
        this.router.put('/:card_id/deposit', this.controller.deposit);  //post or put????

        this.router.put('/:card_id/withdraw', this.controller.withdraw);  //post or put????
        
        this.router.put('/:card_id/convertPoints', this.controller.convertPoints); //post or put????

        //transaction 
        this.router.post('/:wallet_id/storeTransaction', this.controller.store);
        this.router.get('/:id/showTransaction', this.controller.show);
        this.router.put('/:id/acceptTransaction', this.controller.accept);
        this.router.put('/:id/rejectTransaction', this.controller.reject);
        this.router.get('/students/:student_id/Transaction', this.controller.studentTransactions);
        this.router.get('/other/:other_id/Transaction', this.controller.otherTransactions);

  
      return this.router;
    }
  }
  
  export default WalletRoutes;

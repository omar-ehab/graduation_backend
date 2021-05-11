import WalletService from '../ServicesModels/WalletService.js';

class WalletsController{
  constructor(serviceRegistry){
    this.walletService = new WalletService(serviceRegistry);
  }

  
  /////////////////////////////////////////////////wallet///////////////////////////////////////////////
  create = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("create", {}, req.body)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }

  getWalletByStudentId = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("getWalletByStudentId", req.params)
      // req to get history
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }

  deposit = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("deposit", req.params, req.body)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  withdraw = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("withdraw", req.params, req.body)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  convertPoints = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("convertPoints", req.params)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.send(err.message);
    }
  }

  /////////////////////////////////////////////////transacion/////////////////////////////////////////////// 
  store = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("store", req.params, req.body)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  show = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("show", req.params)
      // req to get history
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  accept = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("accept",req.params, req.body)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  reject = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("reject", req.params)
      // req to get history
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  studentTransactions = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("studentTransactions", req.params)
      // req to get history
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  otherTransactions = async (req, res) => {
    try {
      const response = await this.walletService.fetchData("otherTransactions", req.params)
      // req to get history
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }  

}

export default WalletsController;



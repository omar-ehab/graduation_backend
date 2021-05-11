import MarketService from '../ServicesModels/MarketService.js';
class MarketsController{
  constructor(serviceRegistry){
    this.marketService = new MarketService(serviceRegistry);
  }

  index = async (req, res) => {
    try {
      const response = await this.marketService.fetchData("index")
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.send(err.message);
    }
  }
  
  show = async (req, res) => {
    try {
      const response = await this.marketService.fetchData("show", req.params)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.send(err.message);
    }
  }
  
  store = async (req, res) => {
    try {
      const response = await this.marketService.fetchData("store", {}, req.body)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }

  update = async (req, res) => {
    try {
      const response = await this.marketService.fetchData("update", req.params, req.body)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  destroy = async (req, res) => {
    try {
      const response = await this.marketService.fetchData("destroy", req.params)
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
      const response = await this.marketService.fetchData("deposit", req.params, req.body)
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
      const response = await this.marketService.fetchData("withdraw", req.params, req.body)
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


export default MarketsController;



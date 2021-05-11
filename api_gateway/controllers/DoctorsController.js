import DoctorService from '../ServicesModels/DoctorService.js';
import bcrypt from 'bcrypt';
class DoctoresController{
  constructor(serviceRegistry){
    this.docService = new DoctorService(serviceRegistry);
  }

  index = async (req, res) => {
    try {
      const response = await this.docService.fetchData("index")
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
      const response = await this.docService.fetchData("show", req.params)
      console.log(response.data);
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  
  store = async (req, res) => {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const response = await this.docService.fetchData("store", {}, req.body)
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
      //get user
      //compare user password with req.body.old_password
      //if ok update password
      //if not ok send error back
      // req.body.password = bcrypt.hashSync(req.body.password, 10);
      const response = await this.docService.fetchData("update", req.params, req.body)
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
      const response = await this.docService.fetchData("destroy", req.params)
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

export default DoctoresController;



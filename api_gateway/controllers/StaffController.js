import StaffService from '../ServicesModels/StaffService.js';
import bcrypt from 'bcrypt';
class StaffController{
  constructor(serviceRegistry){
    this.staffService = new StaffService(serviceRegistry);
  }

  index = async (req, res) => {
    try {
      const response = await this.staffService.fetchData("index")
      res.send(response.data);
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  
  show = async (req, res) => {
    try {
      const response = await this.staffService.fetchData("show", req.params);
      res.send(response.data);
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  findByEmail  = async (req, res) => {
    try {
      const response = await this.staffService.fetchData("findByEmail", req.params);
      res.send(response.data);
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  
  store = async (req, res) => {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const response = await this.staffService.fetchData("store", {}, req.body)
      res.send(response.data);
    } catch(err){
      if(err.response){
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({success: false, message: err.message})
      }
    }
  }

  update = async (req, res) => {
    try {
      const response = await this.staffService.fetchData("update", req.params, req.body);
      res.send(response.data);
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }

  destroy = async (req, res) => {
    try {
      const response = await this.staffService.fetchData("destroy", req.params);
      res.send(response.data);
    } catch(err) {
      res.status(err.response.status).json(err.response.data);
    }
  }
}

export default StaffController;



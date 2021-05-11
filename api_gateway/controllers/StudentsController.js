import StudentService from '../ServicesModels/StudentService.js';
import WalletService from '../ServicesModels/WalletService.js';
import bcrypt from 'bcrypt';
class StudentsController{
  constructor(serviceRegistry){
    this.studentService = new StudentService(serviceRegistry);
    this.walletService = new WalletService(serviceRegistry);
  }

  index = async (req, res) => {
    try {
      const response = await this.studentService.fetchData("index");
      res.send(response.data);
      
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  
  show = async (req, res) => {
    try {
      const response = await this.studentService.fetchData("show", req.params);
      res.send(response.data);
      
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }

  findByEmail  = async (req, res) => {
    try {
      const response = await this.studentService.fetchData("findByEmail", req.params);
      res.send(response.data);
      
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }

  store = async (req, res) => {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const response = await this.studentService.fetchData("store", {}, req.body);
      if(response) {
        const walletResponse = await this.walletService.fetchData("create", {}, {
          card_id: response.data.student.card_id
        });
        if(walletResponse) {
          res.send(response.data);
        }
      } else {
        res.sendStatus(404);
      }
    } catch(err) {
      if(err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        console.error(err);
        res.status(500).json(err)
      }
    }
  }

  update = async (req, res) => {
    try {
      
      const response = await this.studentService.fetchData("update", req.params, req.body);
      console.log(response);
      res.send(response.data);
    } catch(err){
      if(err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        console.error(err);
        res.status(500).json(err)
      }
    }
  }

  destroy = async (req, res) => {
    try {
      const response = await this.studentService.fetchData("destroy", req.params);
      res.send(response.data);
    } catch(err){
      if(err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        console.error(err);
        res.status(500).json(err)
      }
    }
  }

  updateFcm = async (req, res) => {
    try {
      const response = await this.studentService.fetchData("updateFcmCode", req.params, req.body);
      res.send(response.data);
    } catch(err){
      if(err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        console.error(err);
        res.status(500).json(err)
      }
    }
  }
}

export default StudentsController;



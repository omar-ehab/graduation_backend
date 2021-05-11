import LectureService from '../ServicesModels/LectureService.js';

class LecturesController {
  constructor(serviceRegistry){
    this.LectureService = new LectureService(serviceRegistry);
  }

  index = async (req, res) => {
    try {
      const response = await this.LectureService.fetchData("index", req.params)
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
      const response = await this.LectureService.fetchData("store", {}, req.body)
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

export default LecturesController;



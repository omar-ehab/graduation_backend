import LabService from '../ServicesModels/LabService.js';
import generate_lab_access_excel from '../helpers/generate_lab_access_excel.js';

class LabsController{
  constructor(serviceRegistry){
    this.labService = new LabService(serviceRegistry);
  }

  store_access = async (req, res) => {
    try {
      const response = await this.labService.fetchData("store_access", {}, req.body);
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  
  get_distincet_labs = async (req, res) => {
    try {
      const response = await this.labService.fetchData("get_distincet_labs", req.params)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  
  download_excel = async (req, res) => {
    try {
      const response = await this.labService.fetchData("get_excel_data", req.params);
      if(response && response.data.success) {
        const workbook = await generate_lab_access_excel(response.data.records);
        res.attachment(`${req.params.lab_id}.xlsx`);
        workbook.xlsx.write(res).then(() => {
            res.end();
        });
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
}

export default LabsController;



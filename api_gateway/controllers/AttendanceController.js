import AttendanceService from '../ServicesModels/AttendanceService.js';
import generate_attendance_excel from '../helpers/generate_attendance_excel.js';
class AttendanceController{
  constructor(serviceRegistry){
    this.AttendanceService = new AttendanceService(serviceRegistry);
  }
   
  record = async (req, res) => {
    try {
      const response = await this.AttendanceService.fetchData("record", {}, req.body)
      if(response){
        res.send(response.data);
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  
  download = async (req, res) => {
    try {
      const response = await this.AttendanceService.fetchData("index", req.params);
      if(response && response.data.success) {
        const workbook = await generate_attendance_excel(response.data.records);
        res.attachment("attendance.xlsx");
        workbook.xlsx.write(res).then(() => res.end());
      } else {
        res.sendStatus(404);
      }
    } catch(err){
      res.status(err.response.status).json(err.response.data);
    }
  }
  
}

export default AttendanceController;



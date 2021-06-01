import bcrypt from 'bcrypt';
import DoctorService from '../ServicesModels/DoctorService.js';
import StudentService from '../ServicesModels/StudentService.js';
import StaffService from '../ServicesModels/StaffService.js';


class User {
  constructor(type, email, serviceRegistry){
    this.type = type;
    this.email = email;
    this.serviceRegistry = serviceRegistry;
  }

  //here we should implement how and from where we will retrive user and validate password

  init_user = async () => {
    if (this.type == 'doctor'){
      this.doctorService = new DoctorService(this.serviceRegistry);
      try{
        const response = await this.doctorService.fetchData("findByEmail", {email: this.email});
        if(response) {
          this.email = response.data.doctor.email;
          this.password = response.data.doctor.password;
          return {type: this.type, user: response.data.doctor}
        }
      } catch(err){
        return false
      }
    } else if(this.type == 'student') {
      this.studentService = new StudentService(this.serviceRegistry);
      try{
        const response = await this.studentService.fetchData("findByEmail", {email: this.email});
        if(response) {
          this.email = response.data.student.email;
          this.password = response.data.student.password;
          const user = response.data.student;
          user.id = user.id;
          user.card_id = user.card_id;
          return {type: this.type, user}
        }
      } catch(err){
        return false
      }
    } else if(this.type == 'staff') {
      this.staffService = new StaffService(this.serviceRegistry);
      try{
        const response = await this.staffService.fetchData("findByEmail", {email: this.email});
        if(response) {
          this.email = response.data.staff.email;
          this.password = response.data.staff.password;
          return {type: this.type, user: response.data.staff}
        }
      } catch(err){
        console.log(err.response.data);
        return false
      }
    }
  }

  isValidPassword = async (password) => {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (err) {
        throw err
    }
  }
}

export default User;
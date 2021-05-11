const axios = require('axios');

const get_fcm = async (student_id) => {
  try{
    return axios.get(`${process.env.API_GATEWAY_PROTOCOL}://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/students/${student_id}`);
  } catch(err){
    console.log(err);
  }
}

module.exports = {
  get_fcm
}

const express = require('express')
require('dotenv').config();
const axios = require('axios');
const { sequelize } = require('./models');
const studentRoutes = require('./routes/students');
const app = express();
const PORT = process.env.SERVICE_PORT || 80;
const registerService = () => axios.put(`http://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/1.0.0/${PORT}`);
app.use(express.json())




//students routes
app.use(studentRoutes);


//404 error
app.use(async (req, res, next) => {
  res.status(404).send("Not Found");
});

//other errors handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    }
  });
});

app.listen(PORT, async () => {
  // await sequelize.sync({force: true});
  registerService();
  setInterval(registerService, 25000);
  console.log(`server running at http://127.0.0.1:${PORT}`);
});
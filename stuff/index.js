const express = require('express');
const { sequelize } = require('./models');
const staffRoute = require('./routes/staff')
const axios = require('axios');
require('dotenv').config();
const PORT = process.env.PORT || 80;
const registerService = () => axios.put(`http://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/1.0.0/${PORT}`);
const app = express();
app.use(express.json());



//staff routes
app.use(staffRoute);



app.listen(PORT, async () => {
    //await sequelize.sync({force: true});
    registerService();
    setInterval(registerService, 25000);
    console.log(`server running at http://127.0.0.1:${PORT}`);

});
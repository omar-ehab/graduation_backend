const express = require('express');
const app = express();
const axios = require('axios');
// const { sequelize } = require('./models');
require('dotenv').config();
const PORT = process.env.PORT || 80;
const registerService = () => axios.put(`http://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/1.0.0/${PORT}`);

const doctorRoutes = require('./routes/doctorRoutes');


//Routes MiddleWheres
app.use(express.json())

//my apis
app.use(doctorRoutes);



//database listen
app.listen(PORT, async () => {
    // await sequelize.sync({ force: true });
    registerService();
    setInterval(registerService, 25000);
    console.log(`server running at http://127.0.0.1:${PORT}`);
});
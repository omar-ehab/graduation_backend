require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const axios = require('axios');

const PORT = process.env.PORT || 80;



const attendance_routes = require('./routes/attendance_routes');

const registerService = () => axios.put(`http://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/1.0.0/${PORT}`);


app.use(express.json());

app.use(attendance_routes);





//Connect to DB
mongoose.connect(process.env.DB_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => {
    registerService();
    setInterval(registerService, 25000);
    console.log(`server running at http://127.0.0.1:${PORT}`);
});
    

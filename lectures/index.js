const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 80;

const lecturesRoutes = require('./routes/lectures_routes');
const registerService = () => axios.put(`http://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/1.0.0/${PORT}`);



app.use(express.json());


app.use(lecturesRoutes);



//Connect to DB
mongoose.connect(process.env.DB_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(PORT, () => {
    registerService();
    setInterval(registerService, 25000);
    console.log(`server running at http://127.0.0.1:${PORT}`);
});
    

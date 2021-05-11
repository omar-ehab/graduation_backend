require("dotenv").config();
const axios  = require("axios");
const express = require("express");
const app = express();
const PORT = process.env.SERVICE_PORT || 80;

const registerService = () => axios.put(`${process.env.API_GATEWAY_PROTOCOL}://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/${process.env.SERVICE_VERSION}/${PORT}`);


const notificationApi= require('./routes/notifications');

app.use(express.json());


app.use(notificationApi);

//starting the server
app.listen(PORT, () => {
    registerService();
    setInterval(registerService, 25000);
    console.log(`server running at http://127.0.0.1:${PORT}`);
});
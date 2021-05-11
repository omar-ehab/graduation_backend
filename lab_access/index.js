const express = require('express');
// const { sequelize } = require('./models');
const axios = require('axios');
const routes = require('./routes');
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

const registerService = () => axios.put(`http://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/1.0.0/${PORT}`);


app.use(routes);



//404 error
app.use(async (req, res, next) => {
    res.status(404);
    res.send("Not Found")
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

//database listen
app.listen(PORT, async () => {
    // await sequelize.sync({ force: true });
    registerService();
    setInterval(registerService, 25000);
    console.log(`server running at http://127.0.0.1:${PORT}`);
});
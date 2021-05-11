const express = require('express')
const helmet = require('helmet');
const createError = require('http-errors');
const cors = require('cors');
const axios = require('axios');
const { sequelize } = require('./models');
require('dotenv').config();

const walletRoutes = require('./routes/wallet');
const transactionsRoutes = require('./routes/transactions');

const PORT = process.env.PORT || 80;

const registerService = () => axios.put(`${process.env.API_GATEWAY_PROTOCOL}://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/1.0.0/${PORT}`);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());



app.use(walletRoutes);

app.use(transactionsRoutes);


//404 error
app.use(async (req, res, next) => {
    next(createError.NotFound());
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
    console.log(`Server up on http://localhost:${PORT}`);
});
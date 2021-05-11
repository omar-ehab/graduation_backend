const express = require('express');
const helmet = require('helmet');
const { sequelize } = require('./models');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


const market_routes = require("./routes/market");

const PORT = process.env.PORT || 80;

const app = express();

const registerService = () => axios.put(`http://${process.env.API_GATEWAY_HOST}:${process.env.API_GATEWAY_PORT}/register/${process.env.SERVICE_NAME}/1.0.0/${PORT}`);


app.use(helmet());
app.use(cors());
app.use(express.json());


//market routes
app.use(market_routes);

//404 error
app.use(async (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "not fount"
  });
});

//other errors handler
app.use((err, req, res) => {
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



import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import createError from 'http-errors';

import ServiceRegistry from './service_registry/ServiceRegistry.js';
import AuthRoutes from './routes/auth/index.js';
import NotificationsRoutes from './routes/notifications.js';
import DoctorRoutes from './routes/doctors.js';
import ServiceRegistryRoutes from './routes/ServiceRegistry.js';
import studnetsRoutes  from './routes/students.js';
import marketRoutes from './routes/markets.js';
import labRoutes  from './routes/labs.js';
import staffRoutes from './routes/staff.js';
import LectureRoutes  from './routes/Lecture.js';
import AttendanceRoutes  from './routes/Attendance.js';
import WalletRoutes from './routes/Wallet.js';

dotenv.config();
const serviceRegistry = new ServiceRegistry();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

///////////////////////////////////////////////////AUTH///////////////////////////////////////////////////

app.use('/auth', new AuthRoutes(serviceRegistry).routes());

///////////////////////////////////////////////////DOCTOR///////////////////////////////////////////////////

app.use('/doctors', new DoctorRoutes(serviceRegistry).routes());

///////////////////////////////////////////////////STAFF////////////////////////////////////////////////////

app.use('/staff', new staffRoutes(serviceRegistry).routes());

////////////////////////////////////////////////STUDENT/////////////////////////////////////////////////////

app.use('/students', new studnetsRoutes(serviceRegistry).routes());

// ////////////////////////////////////////////////MARKET///////////////////////////////////////////////////

app.use('/markets', new marketRoutes(serviceRegistry).routes());

////////////////////////////////////////////////LAB/////////////////////////////////////////////////////////

app.use('/labs', new labRoutes(serviceRegistry).routes());

////////////////////////////////////////////////Lectures//////////////////////////////////////////////////////////

app.use('/lectures', new LectureRoutes(serviceRegistry).routes());


////////////////////////////////////////////////ATTENDANCE/////////////////////////////////////////////////

app.use(new AttendanceRoutes(serviceRegistry).routes());


////////////////////////////////////////////////WALLET//////////////////////////////////////////////////////

app.use('/wallets', new WalletRoutes(serviceRegistry).routes());


////////////////////////////////////////////////NOTIFICATIONS///////////////////////////////////////////////

app.use('/notifications', new NotificationsRoutes(serviceRegistry).routes());

////////////////////////////////////////////////SERVICE REGISTRY////////////////////////////////////////////

app.use(new ServiceRegistryRoutes(serviceRegistry).routes());


//404 error
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

//other errors handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500)
  res.send({
      error: {
      status: err.status || 500,
      message: err.message,
      }
  });
});


app.listen(PORT, () => {
  console.log(`server running at http://127.0.0.1:${PORT}`);
});

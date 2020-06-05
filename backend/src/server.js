import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import auth from './routes/auth';
import ErrorController from "./controllers/ErrorController";

dotenv.config();

const app = express();

import sequelize from "./config/database";

if(process.env.NODE_ENV === 'production') {

  app.use(morgan('combined', {
    skip: function (req, res) {
      return res.statusCode < 400
    }
  }));
} else {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', auth);

app.use(ErrorController.handleError);

export default app;

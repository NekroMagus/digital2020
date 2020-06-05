import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';

import auth from './routes/auth';
import profile from './routes/profile';
import ErrorController from "./controllers/ErrorController";

const app = express();

import sequelize from "./config/database";
import passportOptions from "./middleware/passport";

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

app.use(passport.initialize(passportOptions(passport)));

app.use('/api/auth', auth);
app.use('/api/profile',passport.authenticate('jwt', {session: false}), profile);


app.use(ErrorController.handleError);

export default app;

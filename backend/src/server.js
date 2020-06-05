import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';

import auth from './routes/auth';
import profile from './routes/profile';
import leaders from './routes/leaders';
import ErrorController from "./controllers/ErrorController";

const app = express();

import sequelize from "./config/database";
import passportOptions from "./middleware/passport";

if (process.env.NODE_ENV === 'production') {

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
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize(passportOptions(passport)));

app.get('/auth/vkontakte',
    passport.authenticate('vkontakte', {session: false,}),
    function (req, res) {
      // The request will be redirected to vk.com for authentication, so
      // this function will not be called.
    });

app.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', {session: false, failureRedirect: '/login'}),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

app.get('/', (req, res) => {
  res.status(200).json({
    message: "you logined form vk"
  })
});

app.use('/api/auth', auth);
app.use('/api/leaders',leaders);
app.use('/api/profile', passport.authenticate('jwt', {session: false}), profile);

app.use(ErrorController.handleError);

export default app;

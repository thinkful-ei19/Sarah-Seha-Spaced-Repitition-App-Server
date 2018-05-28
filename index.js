'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config();


const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const localStrategy = require('./auth/local-strategy');
const jwtStrategy = require('./auth/jwt');


//import routers

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const questionsRouter = require('./routes/questions');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//call on passport for user authentication
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', questionsRouter);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };

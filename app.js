const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//require('dotenv').config();
const geAPI = require('./routes/price');
const getItemId = require('./routes/item');
const getPlayerUsername = require('./routes/playerUsername');
const playerLookUp = require('./routes/playerLookUp');
const displayPlayer = require('./routes/displayPlayers');
const getSkill = require('./routes/getOneSkill');

const app = express();

//connection to db
mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/player')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


// //middlewares
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', geAPI);
app.use('/item', getItemId);
app.use('/add', getPlayerUsername);
app.use('/lookup', playerLookUp);
app.use('/display', displayPlayer);
app.use('/getskill', getSkill);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({code: 'not-found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({code: 'unexpected'});
  }
});

module.exports = app;
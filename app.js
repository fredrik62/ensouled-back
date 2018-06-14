const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//require('dotenv').config();
const geAPI = require('./routes/price');
const getItemId = require('./routes/item');
const getItemImage = require('./routes/itemImage');

const app = express();



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
// app.use('/img', getItemImage);

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
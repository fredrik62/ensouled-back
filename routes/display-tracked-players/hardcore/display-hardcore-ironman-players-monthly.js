const express = require('express');
const router = express.Router();

//db collection
const MonthlyHighscore = require('../../../models/monthlyHighscore');

router.get('/', (req, res) => {
  MonthlyHighscore.find({mode: 'Hardcore'} , function (err,users ) {
  res.status(200).json(users);
   })
    .catch((error) => {
      res.json(error);
  })
  });

module.exports = router;
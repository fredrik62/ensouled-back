const express = require('express');
const router = express.Router();

//db collection
const WeeklyHighscore = require('../../../models/weeklyHighscore');

router.get('/', (req, res) => {
  WeeklyHighscore.find({mode: 'Hardcore'} , function (err,users ) {
  res.status(200).json(users);
   })
    .catch((error) => {
      res.json(error);
  })
  });

module.exports = router;
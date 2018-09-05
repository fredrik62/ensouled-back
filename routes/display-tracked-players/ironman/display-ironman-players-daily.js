const express = require('express');
const router = express.Router();

//db collection
const DailyHighscore = require('../../../models/dailyHighscore');

router.get('/', (req, res) => {
DailyHighscore.find({mode: 'Ironman'} , function (err,users ) {
res.status(200).json(users);
})
  .catch((error) => {
    res.json(error);
})
});

module.exports = router;

  





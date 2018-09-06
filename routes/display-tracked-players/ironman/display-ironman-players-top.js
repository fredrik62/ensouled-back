const express = require('express');
const router = express.Router();

//db collection
const DailyHighscore = require('../../../models/dailyHighscore');
const WeeklyHighscore = require('../../../models/weeklyHighscore');
const MonthlyHighscore = require('../../../models/monthlyHighscore');

router.get('/', (req, res) => {
WeeklyHighscore.find({mode: 'Ironman'} , function (err,users ) {
res.status(200).json(users);
})
  .catch((error) => {
    res.json(error);
})
});

module.exports = router;
const express = require('express');
const router = express.Router();


const DailyHighscore = require('../../../models/dailyHighscore');


router.get('/', (req, res) => {
DailyHighscore.find({mode: 'Regular'}, function (err,users ) {
  res.status(200).json(users);
})
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;


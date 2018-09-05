const express = require('express');
const router = express.Router();

//db collection
const MonthlyHighscore = require('../../../models/MonthlyHighscore');

router.get('/', (req, res) => {
MonthlyHighscore.find({mode: 'Ironman'} , function (err,users ) {
res.status(200).json(users);
})
  .catch((error) => {
    res.json(error);
})
});

module.exports = router;
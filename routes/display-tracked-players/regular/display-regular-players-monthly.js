const express = require('express');
const router = express.Router();


const MonthyHighscore = require('../../../models/monthlyHighscore');


router.get('/', (req, res) => {
MonthyHighscore.find({mode: 'Regular'}, function (err,users ) {
  res.status(200).json(users);
})
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;
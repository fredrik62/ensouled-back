const express = require('express');
const router = express.Router();
const DailyHighscore = require('../../../models/dailyHighscore');


router.get('/:id', (req, res) => {
  const player = req.params.id
 
  DailyHighscore.findOne({'username': player} , function (err,user ) {
    res.status(200).json(user);
     })
      .catch((error) => {
        res.json(error);
    })
 
 });

 module.exports = router;
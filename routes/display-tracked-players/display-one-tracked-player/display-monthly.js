const express = require('express');
const router = express.Router();

const MonthlyHighscore = require('../../../models/monthlyHighscore');

router.get('/:id', (req, res) => {
  const player = req.params.id
 
  MonthlyHighscore.findOne({'username': player} , function (err,user ) {
    res.status(200).json(user);
     })
      .catch((error) => {
        res.json(error);
    })
 
 
 });

 module.exports = router;



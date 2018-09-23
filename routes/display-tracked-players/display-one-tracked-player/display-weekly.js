const express = require('express');
const router = express.Router();

const WeeklyHighscore = require('../../../models/weeklyHighscore');

router.get('/:id', (req, res) => {
  const player = req.params.id
 
  WeeklyHighscore.findOne({'username': player} ,(err,user ) => {
    if (user !== null) {
    return res.status(200).json(user);
   } else {
    return res.status(404).json({code: 'player cannot be found'});
   }
     })
      .catch((error) => {
        res.json(error);
    })
 
 
 });

 module.exports = router;




//this route will display all players in the db
//utc + 3 timezone

const express = require('express');
const router = express.Router();


//updated accounts in here
const DailyHighscore = require('../../../models/dailyHighscore');

router.get('/', (req, res) => {
DailyHighscore.find({mode: 'Ultimate'} , function (err,users ) {
res.status(200).json(users);
 })
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;
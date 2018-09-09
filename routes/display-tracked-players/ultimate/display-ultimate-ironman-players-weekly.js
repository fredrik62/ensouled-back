//this route will display all players in the db
//utc + 3 timezone

const express = require('express');
const router = express.Router();


const WeeklyHighscore = require('../../../models/weeklyHighscore');

router.get('/', (req, res) => {
WeeklyHighscore.find({mode: 'Ultimate'} , function (err,users ) {
res.status(200).json(users);
 })
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;
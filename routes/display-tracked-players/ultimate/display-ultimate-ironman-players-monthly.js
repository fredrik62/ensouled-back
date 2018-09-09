//this route will display all players in the db
//utc + 3 timezone

const express = require('express');
const router = express.Router();


//updated accounts in here
const MonthlyHighscore = require('../../../models/monthlyHighscore');

router.get('/', (req, res) => {
MonthlyHighscore.find({mode: 'Ultimate'} , function (err,users ) {
res.status(200).json(users);
 })
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;
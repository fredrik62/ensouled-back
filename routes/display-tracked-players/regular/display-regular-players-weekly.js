const express = require('express');
const router = express.Router();


const DeeklyHighscore = require('../../../models/weeklyHighscore');


router.get('/', (req, res) => {
DeeklyHighscore.find({mode: 'Regular'}, function (err,users ) {
  res.status(200).json(users);
})
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;
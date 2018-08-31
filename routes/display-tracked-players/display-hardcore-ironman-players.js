//this route will display all players in the db
//utc + 3 timezone

const express = require('express');
const router = express.Router();

//db collection
const Player = require('../../models/player');

var moment = require('moment');
var startOfDay = moment().startOf('day').format();
var endOfDay = moment().endOf('day').format();

//updated accounts in here
const PlayerData = require('../../models/playerUpdate');

router.get('/', (req, res) => {
PlayerData.find({mode: 'Hardcore'}, {"updated": {$gte: (startOfDay), $lt: (endOfDay)}} , function (err,users ) {
  res.status(200).json(users);
 
 
})
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;
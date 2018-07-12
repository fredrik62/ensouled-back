//this route will display all players in the db

const express = require('express');
const router = express.Router();

//db collection
const Player = require('../../models/player');

router.get('/', (req, res) => {
Player.find({mode: 'Hardcore'} , function (err,users ) {
  res.status(200).json(users);
 
})
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;
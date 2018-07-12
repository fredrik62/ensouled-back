

const express = require('express');
const router = express.Router();

//db collection
const Player = require('../../models/player');

router.get('/', (req, res) => {
Player.find({mode: 'Ironman'} , function (err,users ) {
  res.status(200).json(users);
 
})
  .catch((error) => {
    res.json(error);
})
});



module.exports = router;
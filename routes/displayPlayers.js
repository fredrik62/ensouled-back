const express = require('express');
const router = express.Router();

//db collection
const Player = require('../models/player');

router.get('/', (req, res) => {
Player.find({}, function (err,users ) {
  if (err) {
    res.json("something went really wrong");
    next;
  }
  res.json(users);
})
   
    

  

});



module.exports = router;


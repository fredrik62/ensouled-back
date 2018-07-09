const express = require('express');
const osrs = require("osrs-wrapper");
const router = express.Router();
const Player = require('../models/player');




router.get('/:player', (req, res) => {
const playerUserName = req.params.player;

if (playerUserName.length === 0 || playerUserName.length > 12) {
console.log("error"); //send error to front end
} else {


 Player.findOne({ 'username': playerUserName })
    .then((player) => {
      if (player !== null) {
        res.status(200).json(player);
        
      } else {
        osrs.hiscores.getPlayer(playerUserName)
        .then(player => {
          if (player !== null) {
            res.status(200).json(player.Skills);
          } else if (player === null){
            console.log("error");
            next;

          }
          
        }) 
      }
    })
    .catch((error) => {
      res.json(error);
    })
    }
    
  

});





module.exports = router;


//todo username validation
// check if username exists send error if it doesnt
//send error to frontend


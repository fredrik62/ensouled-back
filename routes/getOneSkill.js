
const express = require('express');
const osrs = require("osrs-wrapper");
const router = express.Router();
const Player = require('../models/player');




router.get('/:player', (req, res) => {
const playerUserName = req.params.player;

const symbols = /^[a-zA-Z0-9_ ]*$/;
const hasSymbol = symbols.test(playerUserName);

if (hasSymbol === false || playerUserName.length === 0 || playerUserName.length > 12) {
  return res.status(403).json({code: 'Forbidden, issue with user input'});
}  else {


 Player.findOne({ 'username': playerUserName })
    .then((player) => {
      if (player !== null) {
        res.status(200).json(player);
        
      } else {
        osrs.hiscores.getPlayer(playerUserName)
        .then(player => {
          if (player !== null) {
            res.status(200).json(player.Skills);
          } 
          
        }) 
        .catch((error) => {
          if (error) {
            if (error.statusCode === 404) {
             return res.status(404).json({code: 'player cannot be found'});
            }
           }
        })
      }
    })
  }
    
  

});





module.exports = router;
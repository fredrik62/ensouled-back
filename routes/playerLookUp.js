const express = require('express');
const osrs = require("osrs-wrapper");
const router = express.Router();




router.get('/:player', (req, res) => {
const playerUserName = req.params.player;

if (playerUserName.length === 0 || playerUserName.length > 12) {
console.log("error"); //send error to front end
} else {
console.log("all good");
osrs.hiscores.getPlayer(playerUserName)
.then(player => {
  res.status(200).json(player.Skills);
}) 
    
  
.catch((error) => {
  res.json(error);
})
}

});





module.exports = router;


//todo username validation
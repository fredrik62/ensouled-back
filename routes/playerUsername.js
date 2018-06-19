const express = require('express');
const router = express.Router();
const osrs = require("osrs-wrapper");
const axios = require('axios');
//db collection
const Player = require('../models/player');


function PlayerSkill(playerData) {
this.playerData = playerData;
console.log(playerData);
const data = {
    overAllRank: this.playerData.Skills.Overall.rank
}
this.returnPlayerDetails = function() {
        return data;
        
}}


router.post('/user', (req, res) => {
const playerUserName = req.body.rsn;

if (playerUserName.length === 0 || playerUserName.length > 12) {
console.log("error"); //send error to front end
} else {
console.log("all good");
osrs.hiscores.getPlayer(playerUserName)
.then(player => {
PlayerSkill(player);

}) 
const me = new PlayerSkill();
const account = me.returnPlayerDetails()

const newPlayer = Player({
username: playerUserName,
overAllRank: account.overAllRank
})


    
newPlayer.save()
.then(player => {
console.log(player + " saved to database");
})


.catch((error) => {
res.json(error);
})

}});




//deleted }
//  .catch(err => {
//  res.status(400).send("unable to save to database");
//  })
// var playerData = (JSON.stringify(player, null, 2));

module.exports = router;


//todo

//check if username already exists
//fix timing issue
//store all data properly
//fix error codes
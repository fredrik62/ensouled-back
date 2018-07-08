const express = require('express');
const router = express.Router();
const osrs = require("osrs-wrapper");
const axios = require('axios');
//db collection
const Player = require('../models/player');

function PlayerSkill() {
    this.set = function(playerData) {
      // set 'data' to whatever is passed into the function
      this.data = {
        overallRank: playerData.Skills.Overall.rank,
        totalLevel: playerData.Skills.Overall.level,
        totalExperience:  playerData.Skills.Overall.xp
      };
      console.log(this.data);
    };
    this.returnPlayerDetails = function() {
      // return the data
      return this.data;
    };
  }

router.post('/user', (req, res) => {
    const playerUserName = req.body.rsn;

    User.findOne({playerUserName}, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({code: 'username-not-unique'});
    //   }
    if (playerUserName.length === 0 || playerUserName.length > 12) {
        console.log("error"); //fix and send error to front end
    } else {
        console.log("all good");
        let player = osrs.hiscores.getPlayer(playerUserName)
            .then(player => {
                PlayerSkill(player);

                const me = new PlayerSkill();
                me.set(player);
                const account = me.returnPlayerDetails();


                var newPlayer = Player({
                    username: playerUserName,
                    overAllRank: account.overallRank,
                    totalLevel: account.totalLevel,
                    totalExperience: account.totalExperience,
                })
                newPlayer.save()
                    .then(player => {
                        console.log(player + " saved to database");
                    })
                
                    .catch((error) => {
                        res.json(error);
                    })
            })


        



    }
});




//deleted }
//  .catch(err => {
//  res.status(400).send("unable to save to database");
//  })
// var playerData = (JSON.stringify(player, null, 2));

module.exports = router;


//todo

//check if username already exists
//fix timing issue  ----> FIXED
//store all data properly
//fix error codes
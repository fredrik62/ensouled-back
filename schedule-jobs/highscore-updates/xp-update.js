const express = require('express');
const router = express.Router();

const PlayerData = require('../../models/playerUpdate');
const Player = require('../../models/player');

module.exports = {
  calculateXpGains: function() {
    Player.find({})
    .then((playerUsername) => {
      for (let i = 0; i < playerUsername.length; i++) {
        let user = playerUsername[i].username;

        PlayerData.find({ 'username': user})
        .then((data) => {
          const d1 = data[0].totalExperience;
          const dLast = data[data.length -1].totalExperience;

          const a1 = data[0].Attack.xp;
          const aLast = data[data.length -1].Attack.xp;
          const a1Rank = data[0].Attack.rank;
          const aLastRank = data[data.length -1].Attack.rank;

          const def1 = data[0].Defence.xp;
          const defLast = data[data.length -1].Defence.xp;
          const d1Rank = data[0].Defence.rank;
          const dLastRank = data[data.length -1].Defence.rank;

          const str1 = data[0].Strength.xp;
          const strLast = data[data.length -1].Strength.xp;
          const str1Rank = data[0].Strength.rank;
          const strLastRank = data[data.length -1].Strength.rank;
         
         
          let playerXpGain = {
            username: user,
            totalExperience: dLast - d1,
            attack: aLast - a1,
            attackRank: a1Rank - aLastRank,
            defence: defLast - def1,
            defenceRank: d1Rank - dLastRank,
            strength: strLast - str1,
            strengthRank: str1Rank - strLastRank

          }
          console.log(playerXpGain);
        })
      }
    })

      
    }
    }


      
     
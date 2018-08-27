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

        PlayerData.findOne({ 'username': user})
        .then((data) => {
          console.log(data);
        })
      }
    })

      
    }
    }


      
     
const express = require('express');
const osrs = require("osrs-wrapper");
const router = express.Router();

const StoredPlayerData = require('../../../models/storedPlayerData');


router.get('/:player', (req, res) => {
  const accountUsername = req.params.player;


  StoredPlayerData.find({
      'username': accountUsername
    }, (err, user) => {
      if (user !== null) {
        return res.status(200).json(user);
       } else {
        return res.status(404).json({
          code: 'player cannot be found'
        });
      }
    })
    .catch((error) => {
      res.json(error);
    })


})





module.exports = router;



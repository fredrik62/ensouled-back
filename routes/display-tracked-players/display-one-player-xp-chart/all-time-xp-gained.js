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

        const updates = [];

        for (let x = 0; x < user.length; x++) {

          const graphData = {
            updatedAt: user[x].updated,
            totalExperience: user[x].totalExperience
          }
          updates.push(graphData);
        }
        return res.status(200).json(updates);

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



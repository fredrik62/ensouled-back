const Twit = require('twit');
const express = require('express');
const router = express.Router();

const osrs = require("osrs-wrapper");

//hcim mongodb collection
const HCIM = require('../models/hcimDeathData');

const T = new Twit({
   consumer_key:         'Rt5CUETLaZ35fJIYmMjcHLoTt',
   consumer_secret:      'a26Admz98eomZuQ5JbHQD6iLbuaYwbPBoXUOy10ynydF6HhFjA',
   access_token:         '1005514596109705216-6vVl3pBfNKGQPhLMrdEIU6wWGNZufa',
   access_token_secret:  'ntRXS3qgVXdedgSFLUpdlsOIk0LlKG7qRoXcAJjiwVXgE'
})

const options = { screen_name: 'HCIM_Deaths',
                count: 1 };

  module.exports = {
    getTweets: function() {

      T.get('statuses/user_timeline', options , function(err, data) {
        var tweetData = data[0].text;
        var startOfhasDied = tweetData.indexOf('has died!');


        var playerNameFromTweet = tweetData.substring(0,  startOfhasDied);
        var playerStatsDeathMoment = data[0].entities.media[0].media_url_https;
        var twitterPostId  = data[0].entities.media[0].id;
        var hcim = "Hardcore";
        
        osrs.hiscores.getPlayer(playerNameFromTweet, hcim)
        .then(playerData => {
          if (playerData !== null) {

            let hcimDeathData = {
              playerUsername: playerNameFromTweet,
              twitterPostId: twitterPostId,
              statsAtDeath: playerStatsDeathMoment,
              overallRank: playerData.Skills.Overall.rank,
              overAllXp: playerData.Skills.Overall.xp,
              totalLevel:playerData.Skills.Overall.level,
            }
            var newHcimDeath = HCIM({
             data: hcimDeathData
                     
           })
     
           newHcimDeath.save()
               .then(hcimDeath => {
                   console.log(hcimDeath + " saved to database");
                  
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
      })
     }
    }

       
          
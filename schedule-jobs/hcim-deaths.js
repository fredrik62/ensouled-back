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
        var includes = tweetData.includes('has died!');
        


        
        if (!includes) {
         console.log("shit is no good so you don't want this");
        } else {
          
          const playerNameFromTweet = tweetData.substring(0,  startOfhasDied);
          console.log(playerNameFromTweet);
          const playerStatsDeathMoment = data[0].entities.media[0].media_url_https;
          const twitterPostId  = data[0].entities.media[0].id;
          const hcim = "Hardcore";
          const source = data[0].entities.media[0].url;
        
        
        osrs.hiscores.getPlayer(playerNameFromTweet, hcim)
        .then(playerData => {
          console.log(playerData);
         if (playerData !== null) {

       HCIM.findOne({
           'username': playerNameFromTweet
         })
         .then((userExists) => {
           if (userExists) {
             console.log("user already exists so no need to do this again...");
           } else if (!userExists) {

             let hcimDeathData = {
               playerUsername: playerNameFromTweet,
               twitterPostId: twitterPostId,
               statsAtDeath: playerStatsDeathMoment,
               overallRank: playerData.Skills.Overall.rank,
               overAllXp: playerData.Skills.Overall.xp,
               totalLevel: playerData.Skills.Overall.level,
               source: source
              
             }
             var newHcimDeath = HCIM({
               username: playerNameFromTweet,
               data: hcimDeathData

             })

             newHcimDeath.save()
               .then(hcimDeath => {
                 console.log(hcimDeath + " saved to database");

               })

              } //else statement ends here
            })
          }
          
        })
        .catch((error) => {
          if (error) {
            if (error.statusCode === 404) {
              console.log("player from the tweet can't be found, has most likely changed their username");
            }
          }
        })
      } //needs to end here
      
    })
 }
 }
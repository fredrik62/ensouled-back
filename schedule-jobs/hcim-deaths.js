const Twit = require('twit');
const express = require('express');
const router = express.Router();

const T = new Twit({
   consumer_key:         'Rt5CUETLaZ35fJIYmMjcHLoTt',
   consumer_secret:      'a26Admz98eomZuQ5JbHQD6iLbuaYwbPBoXUOy10ynydF6HhFjA',
   access_token:         '1005514596109705216-6vVl3pBfNKGQPhLMrdEIU6wWGNZufa',
   access_token_secret:  'ntRXS3qgVXdedgSFLUpdlsOIk0LlKG7qRoXcAJjiwVXgE'
})

const options = { screen_name: 'HCIM_Deaths',
                count: 3 };

  module.exports = {
    getTweets: function() {

      T.get('statuses/user_timeline', options , function(err, data) {
        var b = [];
        for (var i = 0; i < data.length ; i++) {
          let x = {
          playerStatsImage: data[i].entities.media
          } 
            
           b.push(x);
          }
          console.log(b);
      })
     }
    }
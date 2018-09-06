const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// cron scheduler
const cron = require("node-cron");

//for twitter
const Twit = require('twit');


//require('dotenv').config();
const geAPI = require('./routes/price');
const getItemId = require('./routes/item');
//all different player modes
const trackRegularPlayer = require('./routes/player-tracking/track-regular-player');
const trackIronmanPlayer = require('./routes/player-tracking/track-ironman-player');
const trackHardcoreIronmanPlayer = require('./routes/player-tracking/track-hardcore-ironman-player');
const trackUltimateIronmanPlayer = require('./routes/player-tracking/track-ultimate-ironman-player');
//THIS DISPLAYS ALL PLAYERS IN DATABASE

//normies
const displayAllRegularPlayers = require('./routes/display-tracked-players/display-regular-players');

//ironman
const displayAllIronmanPlayersDaily = require('./routes/display-tracked-players/ironman/display-ironman-players-daily');
const displayAllIronmanPlayersWeekly = require('./routes/display-tracked-players/ironman/display-ironman-players-weekly');
const displayAllIronmanPlayersMonthly = require('./routes/display-tracked-players/ironman/display-ironman-players-monthly');
const displayAllTopIronmanPlayers = require('./routes/display-tracked-players/ironman/display-ironman-players-top');


const displayAllHardcoreIronmanPlayers = require('./routes/display-tracked-players/display-hardcore-ironman-players');
const displayAllUltimateIronmanPlayers = require('./routes/display-tracked-players/display-ultimate-ironman-players');

const playerLookUp = require('./routes/playerLookUp');
const getSkill = require('./routes/getOneSkill');

//twitter feed hcim deaths
const hcimDeathLookUp = require('./routes/display-twitter-feed/three-tweets');
const hcimDeathSearch = require('./routes/display-twitter-feed/all-tweets');

const app = express();

//connection to db
mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/player')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


// //middlewares
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//grandexchange price data
app.use('/', geAPI);
app.use('/item', getItemId);

//track different account modes
app.use('/trackregular', trackRegularPlayer);
app.use('/trackironman', trackIronmanPlayer);
app.use('/trackhardcore', trackHardcoreIronmanPlayer);
app.use('/trackultimate', trackUltimateIronmanPlayer);

//displaying different account modes

//normie
app.use('/display-all-players', displayAllRegularPlayers);

//ironman
app.use('/display-all-ironman-players',displayAllIronmanPlayersDaily);
app.use('/display-all-ironman-players-weekly',displayAllIronmanPlayersWeekly);
app.use('/display-all-ironman-players-monthly',displayAllIronmanPlayersMonthly);
app.use('/display-all-top-ironman-players',displayAllTopIronmanPlayers);

//hcim
app.use('/display-all-hardcore-ironman-players',displayAllHardcoreIronmanPlayers);

//uim
app.use('/display-all-ultimate-ironman-players',displayAllUltimateIronmanPlayers);


//display twitter feed in front end
app.use('/three-tweets',hcimDeathLookUp); 
app.use('/all-tweets',hcimDeathSearch);

//cron jobs
//data gets all price data for all OSRS ITEMS
const data = require('./schedule-jobs/grandExchangePriceData');
cron.schedule("0 0 */2 * * *", function() {
  // data.getMeData();
  // hcimDeaths.getTweets();
});

//get HCIM DEATHS 
const hcimDeaths = require('./schedule-jobs/hcim-deaths');


//updates begin here

//mainPlayerUpdater is what is making the axios request to runescape and gets the data
//the daily, weekly and monthly are db collections with the corresponding data
const mainPlayerUpdater = require('./schedule-jobs/highscore-updates/main-player-updater');
const dailyHighscore = require('./schedule-jobs/highscore-updates/twentyFourHourHighscore');
const weeklyHighscore = require('./schedule-jobs/highscore-updates/weeklyHighscore');
const monthlyHighscore = require('./schedule-jobs/highscore-updates/monthlyHighscore');

cron.schedule('*/1 * * * *', function(){
  // // hcimDeaths.getTweets();
  // mainPlayerUpdater.storePlayerData();
  // dailyHighscore.calculateXpGains();
  console.log('running a task every minute');
});

cron.schedule('*/2 * * * *', function(){
  // hcimDeaths.getTweets();
  // mainPlayerUpdater.storePlayerData();
  //  dailyHighscore.calculateXpGains();
  // monthlyHighscore.calculateXpGains();
  // weeklyHighscore.calculateXpGains();
  // console.log('running a task every 2 minutes');
});

//random stat lookups
app.use('/lookup', playerLookUp);
app.use('/getskill', getSkill);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({code: 'not-found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({code: 'unexpected'});
  }
});

module.exports = app;
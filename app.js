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
const displayAllGrandExchangeItems = require('./routes/display-grandExchange-item/display-all-item-prices');
const displayClickedItem = require('./routes/display-grandExchange-item/display-one-item');
const displayClickedItemChart = require('./routes/display-grandExchange-item/display-one-item-chart');


//all different player modes
const trackRegularPlayer = require('./routes/player-tracking/track-regular-player');
const trackIronmanPlayer = require('./routes/player-tracking/track-ironman-player');
const trackHardcoreIronmanPlayer = require('./routes/player-tracking/track-hardcore-ironman-player');
const trackUltimateIronmanPlayer = require('./routes/player-tracking/track-ultimate-ironman-player');


//normies
const displayAllRegularPlayersDaily = require('./routes/display-tracked-players/regular/display-regular-players-daily');
const displayAllRegularPlayersWeekly = require('./routes/display-tracked-players/regular/display-regular-players-weekly');
const displayAllRegularPlayersMonthly = require('./routes/display-tracked-players/regular/display-regular-players-monthly');


//ironman
const displayAllIronmanPlayersDaily = require('./routes/display-tracked-players/ironman/display-ironman-players-daily');
const displayAllIronmanPlayersWeekly = require('./routes/display-tracked-players/ironman/display-ironman-players-weekly');
const displayAllIronmanPlayersMonthly = require('./routes/display-tracked-players/ironman/display-ironman-players-monthly');


//hardcore ironman
const displayAllHardcoreIronmanPlayersDaily = require('./routes/display-tracked-players/hardcore/display-hardcore-ironman-players-daily');
const displayAllHardcoreIronmanPlayersWeekly = require('./routes/display-tracked-players/hardcore/display-hardcore-ironman-players-weekly');
const displayAllHardcoreIronmanPlayersMonthly = require('./routes/display-tracked-players/hardcore/display-hardcore-ironman-players-monthly');

//ultimate ironman
const displayAllUltimateIronmanPlayersDaily = require('./routes/display-tracked-players/ultimate/display-ultimate-ironman-players-daily');
const displayAllUltimateIronmanPlayersWeekly = require('./routes/display-tracked-players/ultimate/display-ultimate-ironman-players-weekly');
const displayAllUltimateIronmanPlayersMonthly = require('./routes/display-tracked-players/ultimate/display-ultimate-ironman-players-monthly');


//display category/:player

const displayOnePlayerDaily = require('./routes/display-tracked-players/display-one-tracked-player/display-daily');
const displayOnePlayerWeekly = require('./routes/display-tracked-players/display-one-tracked-player/display-weekly');
const displayOnePlayerMonthly = require('./routes/display-tracked-players/display-one-tracked-player/display-monthly');

const getXpChart = require('./routes/display-tracked-players/display-one-player-xp-chart/all-time-xp-gained');
const getSkill = require('./routes/get-skill-for-player-calculators/getOneSkill');

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
app.use('/', displayAllGrandExchangeItems);
app.use('/item', displayClickedItem);
app.use('/item-chart', displayClickedItemChart);

//track different account modes
app.use('/trackregular', trackRegularPlayer);
app.use('/trackironman', trackIronmanPlayer);
app.use('/trackhardcore', trackHardcoreIronmanPlayer);
app.use('/trackultimate', trackUltimateIronmanPlayer);

//displaying different account modes

//normie
app.use('/display-all-regular-players', displayAllRegularPlayersDaily);
app.use('/display-all-regular-players-weekly', displayAllRegularPlayersWeekly);
app.use('/display-all-regular-players-monthly', displayAllRegularPlayersMonthly);

//ironman
app.use('/display-all-ironman-players',displayAllIronmanPlayersDaily);
app.use('/display-all-ironman-players-weekly',displayAllIronmanPlayersWeekly);
app.use('/display-all-ironman-players-monthly',displayAllIronmanPlayersMonthly);


//hcim
app.use('/display-all-hardcore-ironman-players',displayAllHardcoreIronmanPlayersDaily);
app.use('/display-all-hardcore-ironman-players-weekly',displayAllHardcoreIronmanPlayersWeekly);
app.use('/display-all-hardcore-ironman-players-monthly',displayAllHardcoreIronmanPlayersMonthly);

//uim
app.use('/display-all-ultimate-ironman-players',displayAllUltimateIronmanPlayersDaily);
app.use('/display-all-ultimate-ironman-players-weekly',displayAllUltimateIronmanPlayersWeekly);
app.use('/display-all-ultimate-ironman-players-monthly',displayAllUltimateIronmanPlayersMonthly);

//displaying hs categories/:player

app.use('/display-one-player-daily',displayOnePlayerDaily);
app.use('/display-one-player-weekly',displayOnePlayerWeekly);
app.use('/display-one-player-monthly',displayOnePlayerMonthly);

//xp chart one player
app.use('/experience-chart', getXpChart);



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
  // data.getMeData();
  // hcimDeaths.getTweets();
  //  mainPlayerUpdater.storePlayerData();
  // dailyHighscore.calculateXpGains();
  console.log('running a task every minute');
});

cron.schedule('*/2 * * * *', function(){
  // hcimDeaths.getTweets();
  // mainPlayerUpdater.storePlayerData();
  //  dailyHighscore.calculateXpGains();
  //  monthlyHighscore.calculateXpGains();
  //  weeklyHighscore.calculateXpGains();
    console.log('running a task every 3 minutes');
});

//random stat lookups
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
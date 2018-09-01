
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const WeeklyHighscoreSchema = new Schema({
username:({type: String}), 
overAllRank: ({type: Number}),
mode: {
  type: String,
  default: 'Regular'
},
totalExperience: ({type: Number}),
totalLevel: ({type: Number}),
overAllRank: ({type: Number}),
Skills: ({type: Array}),
updated: { type: Date, default: Date.now },

});


const WeeklyHighscore = mongoose.model("WeeklyHighscore", WeeklyHighscoreSchema);

module.exports = WeeklyHighscore;
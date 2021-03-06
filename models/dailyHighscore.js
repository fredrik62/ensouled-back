
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const DailyHighscoreSchema = new Schema({
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


const DailyHighscore = mongoose.model("DailyHighscore", DailyHighscoreSchema);

module.exports = DailyHighscore;
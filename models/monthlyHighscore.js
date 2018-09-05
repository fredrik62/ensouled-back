const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const MonthlyHighscoreSchema = new Schema({
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


const MonthlyHighscore = mongoose.model("MonthlyHighscore", MonthlyHighscoreSchema);

module.exports = MonthlyHighscore;
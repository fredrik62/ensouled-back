
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const xpSchema = new Schema({
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


const Update = mongoose.model("Update", xpSchema);

module.exports = Update;

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const playerSchema = new Schema({
 username: String,
 overAllRank: Number,
 totalExperience: Number,
 totalLevel: Number,
 
});


const Player = mongoose.model("Player", playerSchema);

module.exports = Player;

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const playerSchema = new Schema({


username:({type: String, unique: true }), 
overAllRank: Number,
totalExperience: Number,
totalLevel: Number,
  

 Attack: {
  rank: Number,
  xp: Number,
  level: Number
},
Defence: {
  rank: Number,
  xp: Number,
  level: Number
},
Strength: {
  rank: Number,
  xp: Number,
  level: Number
},
Hitpoints: {
  rank: Number,
  xp: Number,
  level: Number
},
Ranged: {
  rank: Number,
  xp: Number,
  level: Number
},
Prayer: {
  rank: Number,
  xp: Number,
  level: Number
},
Magic: {
  rank: Number,
  xp: Number,
  level: Number
},
Cooking: {
  rank: Number,
  xp: Number,
  level: Number
},
Woodcutting: {
  rank: Number,
  xp: Number,
  level: Number
},
Fletching: {
  rank: Number,
  xp: Number,
  level: Number
},
Fishing: {
  rank: Number,
  xp: Number,
  level: Number
},
Firemaking: {
  rank: Number,
  xp: Number,
  level: Number
},
Crafting: {
  rank: Number,
  xp: Number,
  level: Number
},
Smithing: {
  rank: Number,
  xp: Number,
  level: Number
},
Mining: {
  rank: Number,
  xp: Number,
  level: Number
},
Herblore: {
  rank: Number,
  xp: Number,
  level: Number
},
Agility: {
  rank: Number,
  xp: Number,
  level: Number
},
Thieving: {
  rank: Number,
  xp: Number,
  level: Number
},
Slayer: {
  rank: Number,
  xp: Number,
  level: Number
},
Farming: {
  rank: Number,
  xp: Number,
  level: Number
},
Runecrafting: {
  rank: Number,
  xp: Number,
  level: Number
},
Hunter: {
  rank: Number,
  xp: Number,
  level: Number
},
Construction: {
  rank: Number,
  xp: Number,
  level: Number
}
 
});


const Player = mongoose.model("Player", playerSchema);

module.exports = Player;



 


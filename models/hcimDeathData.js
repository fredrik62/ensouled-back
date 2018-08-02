const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const deathSchema = new Schema({
    username:({type: String, unique: true }), 
    data: { type: Object },
    updated: { type: Date, default: Date.now }
  
});


const death = mongoose.model("death", deathSchema);

module.exports = death;
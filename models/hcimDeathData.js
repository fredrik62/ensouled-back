const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const deathSchema = new Schema({
  
    data: { type: Object },
    updated: { type: Date, default: Date.now }
  
});


const death = mongoose.model("death", deathSchema);

module.exports = death;
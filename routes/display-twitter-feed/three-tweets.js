const express = require('express');
const router = express.Router();

//db collection
const HCIM = require('../../models/hcimDeathData');



router.get('/', (req, res) => {
  HCIM.find({} , function (err,deaths ) {
  const limit = 1;
  const hcimDeaths = deaths.length;
  let threeMostRecentDeaths = [];
    for (let i = hcimDeaths - 1; i >= hcimDeaths-limit; i--) {
      threeMostRecentDeaths.push(deaths[i]);
      
  }
  res.status(200).json(threeMostRecentDeaths);
  })
    .catch((error) => {
      res.json(error);
  })
  });



module.exports = router;


// HCIM.find({} , function (err,deaths ) {
    
//   res.status(200).json(deaths);
 
// })
//   .catch((error) => {
//     res.json(error);
// })
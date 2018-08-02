const express = require('express');
const router = express.Router();

//db collection
const HCIM = require('../../models/hcimDeathData');



router.get('/', (req, res) => {
  HCIM.find({} , function (err,deaths ) {
    console.log(deaths.length);
    res.status(200).json(deaths);
   
  })
    .catch((error) => {
      res.json(error);
  })
  });



module.exports = router;
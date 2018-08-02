const express = require('express');
const router = express.Router();

//db collection
const HCIM = require('../../models/hcimDeathData');

// router.get('/', (req, res) => {
// HCIM.find().limit(3) , function (err,deaths ) {
//   res.status(200).json(deaths);
 
// }
//   .catch((error) => {
//     res.json(error);
// })
// });

router.get('/', (req, res) => {
  HCIM.find({} , function (err,deaths ) {
    res.status(200).json(deaths);
   
  })
    .catch((error) => {
      res.json(error);
  })
  });



module.exports = router;
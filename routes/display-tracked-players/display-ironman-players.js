const express = require('express');
const router = express.Router();

//db collection
const XpGain = require('../../models/xpUpdate');

router.get('/', (req, res) => {
XpGain.find({mode: 'Ironman'} , function (err,users ) {
  if (users.length === 0) {
    console.log("yes");
  } else {
    res.status(200).json(users);

  }

})
  .catch((error) => {
    res.json(error);
})
});

module.exports = router;




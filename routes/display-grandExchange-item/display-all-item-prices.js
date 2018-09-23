const express = require('express');
const axios = require('axios');
const router = express.Router();
const Item = require('../../models/grandExchangeData');


router.get('/', (req, res) => {
  Item.find({}, function (err, data) {
    if (err) {
      res.json(err)
       next();
    }
    res.status(200).json(data);

  })
});





module.exports = router;


const express = require('express');
const axios = require('axios');
const router = express.Router();

const geAPI = "https://rsbuddy.com/exchange/summary.json";


router.get('/', (req, res) => {
  axios.get(geAPI)
    .then((response) => {
      res.status(200).json(response.data);
      })
    .catch((error) => {
      res.json(error);
    });
});





module.exports = router;


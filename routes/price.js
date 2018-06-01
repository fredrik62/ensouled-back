const express = require('express');
const axios = require('axios');
const router = express.Router();

const geAPI = "https://rsbuddy.com/exchange/summary.json";
const base_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item='


router.get('/', (req, res) => {
  axios.get(geAPI)
    .then((response) => {
      res.status(200).json(response.data);
      })
    .catch((error) => {
      res.json(error);
    });
});



router.post('/item/:id', (req, res) => {
  const id = req.body.id;
  axios.get(base_URL + id)
    .then((response) => {
      console.log(response);
      res.status(200).json(response.data);
      })
    .catch((error) => {
      res.json(error);
    });
});






module.exports = router;


const express = require('express');
const axios = require('axios');
const router = express.Router();

const base_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
const graph_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/graph/';


let linkId;

const getItem = () => {
  return axios.get(base_URL + linkId);
}

const getItemGraph = () => {
  return axios.get(graph_URL + linkId +".json");
}

router.get('/:id', (req, res) => {
  linkId = req.params.id;
  axios.all([getItem(), getItemGraph()])
  .then(axios.spread((item, price) => {
    const itemData = item.data;
    const graphData = price.data;

    const data = {
        itemData: itemData,
        graphData: graphData
    }
    res.status(200).json(data);
    
}))
    .catch((error) => {
        res.json(error);
    })

});

module.exports = router;



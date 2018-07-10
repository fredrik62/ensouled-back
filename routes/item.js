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
  const symbols = /^[a-zA-Z0-9_ ]*$/;
  const hasSymbol = symbols.test(linkId);

  if (hasSymbol === false || linkId.length > 5) {
      return res.status(404).json({code: 'Item not found'});
  }
   
    axios.all([getItem(), getItemGraph()])
        .then(axios.spread((item, price) => {
            
            const itemData = item.data;
            const graphData = price.data;

            const data = {
                itemData: itemData,
                graphData: graphData
            }
            console.log("ddd" + data);
            res.status(200).json(data);

        }
    ))
    .catch((error) => {
        if (error.response) {
            //console.log(error.response.data);
            if (error.response.status === 404) {
                return res.status(404).json({code: 'Item not found'});
            }
            // console.log(error.response.headers);
          }
        // res.json(error);
    })

});

module.exports = router;



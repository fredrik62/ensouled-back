const express = require('express');
const axios = require('axios');
const router = express.Router();

const base_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
const graph_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/graph/';



router.get('/:id', (req, res) => {
  linkId = req.params.id;
  const symbols = /^[a-zA-Z0-9_ ]*$/;
  const hasSymbol = symbols.test(linkId);

  if (hasSymbol === false || linkId.length > 5) {
      return res.status(404).json({code: 'Item not found'});
  } else {

      let urlArray = [base_URL + linkId, graph_URL + linkId + '.json'] // unknown # of urls (1 or more)
    
      let promiseArray = urlArray.map(url => axios.get(url));
      axios.all(promiseArray)
      .then((data => {
       res.status(200).json(data);
          
      })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    return res.status(404).json({code: 'Item not found'});
                }
                
              }
           
        })
    
      )}});
  
   

module.exports = router;



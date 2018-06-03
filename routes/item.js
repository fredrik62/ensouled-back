const express = require('express');
const axios = require('axios');
const router = express.Router();

const base_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item='


router.get('/:id', (req, res) => {
  console.log(req.params.id);
          res.send("ok");
        
        });



// router.post('/:id', (req, res) => {
 
// //   axios.get(base_URL + id)
// //     .then((response) => {
// //       console.log(response);
// //       res.status(200).json(response.data);
// //       })
// //     .catch((error) => {
// //       res.json(error);
// //     });
// });

module.exports = router;

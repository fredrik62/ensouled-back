const express = require('express');
const axios = require('axios');
const router = express.Router();

const item_URL = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';



router.get('/:id', (req, res) => {
    //id is item id
    const id = req.params.id;
    axios.get(item_URL + id)
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((error) => {
        if (error.response) {
            if (error.response.status === 404) {
                return res.status(404).json({
                    code: 'Item not found'
                })
            } else {
                console.log(error);
            }
        }
    })
});
   
module.exports = router;



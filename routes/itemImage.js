const express = require('express');
const axios = require('axios');
const router = express.Router();

const imgURL = 'http://services.runescape.com/m=itemdb_oldschool/1528713058107_obj_sprite.gif?id='


router.get('/', (req, res) => {
 res.send("hey");
});




module.exports = router;

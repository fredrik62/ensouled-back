const express = require('express');
const axios = require('axios');
const router = express.Router();

const highScore = "http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=";



router.post('/user', (req, res) => {
const playerUserName = req.body.rsn;

if (playerUserName.length === 0 || playerUserName.length > 12) {
  console.log("error"); //send error to front end
} else {
  console.log("all good");
}
axios.get(highScore + playerUserName)
    .then((response) => {

//converting from cvs to obj
const cvsData = response.data.split('\n');

var jsonObj = [];
const headers = cvsData[0].split(',');
for (let i = 1; i < cvsData.length; i++) {
  const data = cvsData[i].split(',');
  const obj = {};
  for (let j = 0; j < data.length; j++) {
    obj[headers[j].trim()] = data[j].trim();
  }
  jsonObj.push(obj);
}
// console.log(JSON.stringify(jsonObj));

})
.catch((error) => {
res.json(error);
});
const dataInObj = JSON.stringify(jsonObj);
console.log(dataInObj);


});



module.exports = router;

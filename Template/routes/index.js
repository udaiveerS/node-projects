var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var insta = require('../lib/insta');

var mySchema = mongoose.Schema({
  iceCreamName: String,
  name: String
});

var ChoiceModel1 = mongoose.model('choices', mySchema);

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
});


router.get('/newLocation', function(req, res, next) {
    try {
      var lat, lang, distance;
      console.log(req.query);
      lat = req.query.lat;
      lang = req.query.lng;
      distance = req.query.dist;
      console.log(lat + " " + " " + lang + " "  + distance);
      insta.getInstaImages(lat,lang, distance, req, res);
    } catch(e) {
      res.status(400).send("bad params for new locaton")
    }
});

var newChoice = new ChoiceModel1();

router.post('/', function(req, res, next){
  var name1 = req.body.name;
  var name2 = req.body.iceCreamName;
  console.log(name1);
  console.log(name2);

  newChoice.name = name1;
  newChoice.iceCreamName = name2;

  newChoice.save(function(err,obj) {
    if(err) {
      console.log(err);
      res.statusCode(500).send();
    } else {
      console.log("obj was saved ");
      res.json(obj);
    }
  });

});

module.exports = router;

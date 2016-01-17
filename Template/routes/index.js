var express = require('express'); var router = express.Router();
var mongoose = require('mongoose');
var insta = require('../lib/insta');

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
});

setInterval(function(){
    console.log('test');
    var resetDb = true;
    var lat, lang, distance;
    lat = 37.787452;
    lang = -122.396906;
    distance = 5000;
    console.log(lat + " " + " " + lang + " "  + distance);
    insta.getInstaImages(lat,lang, distance, null, null, resetDb);
}, 50000);

router.get('/newLocation', function(req, res, next) {
    try {
    var resetDb = false;
    var lat, lang, distance;
    lat = 37.787452;
    lang = -122.396906;
    distance = 5000;
        console.log(lat + " " + " " + lang + " "  + distance);
      insta.getInstaImages(lat,lang, distance, req, res, resetDb);
    } catch(e) {
      res.status(400).send("bad params for new locaton")
    }
});

module.exports = router;

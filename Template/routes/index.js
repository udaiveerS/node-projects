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
}, 5000);

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


//
//function addEntry() {
//    var myBucket = new Bucket();
//    var x = Math.random();
//    myBucket.title = "title" + x;
//    myBucket.lat = x;
//    myBucket.lng = x;
//    myBucket.images = [];
//    for(var i = 0; i < 4; i++) {
//        var y = {}
//        y.url = "aurl/stf/sdfdsfss.com";
//        y.time =  x;
//        for(var t =0; t < 4; t++) {
//            if(!y.tags) {
//                y.tags = [];
//            } else {
//                y.tags.push('tag' + t);
//            }
//        }
//        myBucket.images.push(y);
//        console.log(y);
//    }
//    return myBucket;
//}


module.exports = router;

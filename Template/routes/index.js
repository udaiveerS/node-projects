var express = require('express'); var router = express.Router();
var mongoose = require('mongoose');
var insta = require('../lib/insta');

var resetDb = true;

var BucketSchema = mongoose.Schema({
    lat: Number,
    lng : Number,
    images: [{ url: String, name: String, time: Number , tags: []}]
});

var Bucket = mongoose.model('buckets', BucketSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
});


router.get('/newLocation', function(req, res, next) {
    try {
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

router.post('/instaPics', function(req, res, next) {
    console.log("got data from insta ");
      var data = req.body;
      console.log(data);
      filterData(data);
      res.status(200).send("ok");
});

function getLatLanIndex(lat, lan, acc) {
    lat = (lat+"").split(".");
    lan = (lan+"").split(".");
    if(!acc) {
        acc = 3;
    }
    var latTmp = lat[0] + "." +  lat[1].substring(0,acc);
    var lanTmp = lan[0] + "." + lan[1].substring(0,acc);
    return [latTmp,lanTmp];
}

function filterData(data) {
    try {
        var filtered = {};
        data = data.data;
        console.log("here 1");
        data.forEach(function (elem) {
            var lat = elem.location.latitude;
            var lan = elem.location.longitude;
            console.log("here 2")
            var indexes = getLatLanIndex(lat, lan, 4);
            console.log("here 2")
            var indexLat = indexes[0];
            var indexLng = indexes[1];
            console.log("here 2")
            var index = indexLat + "_" + indexLng;
            console.log("here 2")
            if (!filtered[index]) {
                filtered[index] = {};
                filtered[index].lat = indexLat;
                filtered[index].lng = indexLng;
                console.log("here 3")
                var imagesObj = parseImages(elem);
                console.log("here 3")
                filtered[index].images  = [imagesObj];
            }
            else {
                var imagesObj2 = parseImages(elem);
                filtered[index].images.push(imagesObj2);
            }
            console.log("here 2")
        });
        console.log(filtered);
        for(key in filtered) {
           console.log(filtered[key].images);
        }
    } catch (e) {
        console.log(e.stack);
    }
}

function parseImages(elem) {
    var image = {};
    if(elem.images) {
        image.lowResUrl = elem.images.low_resolution.url;
        image.highResUrl = elem.images.standard_resolution.url;
        image.time = elem.created_time;
        image.tags = elem.tags;
    }
    return image;
}


function addEntry() {
    var myBucket = new Bucket();
    var x = Math.random();
    myBucket.title = "title" + x;
    myBucket.lat = x;
    myBucket.lng = x;
    myBucket.images = [];
    for(var i = 0; i < 4; i++) {
        var y = {}
        y.url = "aurl/stf/sdfdsfss.com";
        y.time =  x;
        for(var t =0; t < 4; t++) {
            if(!y.tags) {
                y.tags = [];
            } else {
                y.tags.push('tag' + t);
            }
        }
        myBucket.images.push(y);
        console.log(y);
    }
    return myBucket;
}

router.post('/', function(req, res, next){
    var aBucket = addEntry();
    aBucket.save(function(err,obj) {
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

var express = require('express'); var router = express.Router();
var mongoose = require('mongoose');
var insta = require('../lib/insta');
// Load the twilio module
var twilio = require('twilio');

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
});

router.post('/twilio', function(req, res, next) {
//// Create a new REST API client to make authenticated requests against the
//// twilio back end
//    var client = new twilio.RestClient('ACcf282aa9e65ed27e186d50753620a9a8', '4a78bfe7fa4ce3b65a3addf5e9a272dc');
//
//// Pass in parameters to the REST API using an object literal notation. The
//// REST client will handle authentication and response serialzation for you.
//    client.sms.messages.create({
//        to:'+16512223344',
//        from:'TWILIO_NUMBER',
//        body:'ahoy hoy! Testing Twilio and node.js'
//    }, function(error, message) {
//        // The HTTP request to Twilio will run asynchronously. This callback
//        // function will be called when a response is received from Twilio
//        // The "error" variable will contain error information, if any.
//        // If the request was successful, this value will be "falsy"
//        if (!error) {
//            // The second argument to the callback will contain the information
//            // sent back by Twilio for the request. In this case, it is the
//            // information about the text messsage you just sent:
//            console.log('Success! The SID for this SMS message is:');
//            console.log(message.sid);
//
//            console.log('Message sent on:');
//            console.log(message.dateCreated);
//        } else {
//            console.log('Oops! There was an error.');
//        }
//    });

    res.render('index', {title: 'Express'});
});

["#lightBulb", "#ESPNW", "#httr", "#redskins", "#hail", "#anotherpne", "#anotherone", "#girlpower", "#powerpuff", "#eat"]

setInterval(function(){
    //console.log('test');
    var resetDb = true;
    var lat, lang, distance;
    lat = 37.787452;
    lang = -122.396906;
    distance = 5000;
    //console.log(lat + " " + " " + lang + " "  + distance);
    insta.getInstaImages(lat,lang, distance, null, null, resetDb);
}, 50000000);

router.get('/newLocation', function(req, res, next) {
    try {
    var resetDb = false;
    var lat, lang, distance;
    lat = 37.787452;
    lang = -122.396906;
    distance = 5000;
        //console.log(lat + " " + " " + lang + " "  + distance);
      insta.getInstaImages(lat,lang, distance, req, res, resetDb);
    } catch(e) {
      res.status(400).send("bad params for new locaton")
    }
});

module.exports = router;

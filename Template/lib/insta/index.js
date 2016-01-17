var request = require('request')
var mongoose = require('mongoose');

function getLatLanIndex(lat, lan, acc) {
    lat = (lat+"").split(".");
    lan = (lan+"").split(".");
    if(!acc) {
        acc = 2;
    }
    var latTmp = lat[0] + "." +  lat[1].substring(0,acc);
    var lanTmp = lan[0] + "." + lan[1].substring(0,acc);
    return [latTmp,lanTmp];
}

var BucketSchema = mongoose.Schema({
    lat: String,
    lng : String,
    images: [{ lowResUrl: String, highResUrl: String, time: Number, tags: []}]
});

var Bucket = mongoose.model('buckets', BucketSchema);


function filterData(data) {
    var filtered = {};
    try {
        data = data.data;
        data.forEach(function (elem) {
            var lat = elem.location.latitude;
            var lan = elem.location.longitude;
            var indexes = getLatLanIndex(lat, lan, 3);
            var indexLat = indexes[0];
            var indexLng = indexes[1];
            var index = indexLat + "_" + indexLng;
            if (!filtered[index]) {
                filtered[index] = {};
                filtered[index].lat = indexLat;
                filtered[index].lng = indexLng;
                var imagesObj = parseImages(elem);
                filtered[index].images  = [imagesObj];
            }
            else {
                var imagesObj2 = parseImages(elem);
                filtered[index].images.push(imagesObj2);
            }

        });
    } catch (e) {
        console.log(e.stack);
    }
    storeBuckets(filtered);
    return filtered;
}

function storeBuckets(buckets) {
   for(var key in buckets)   {
       var aBucket = buckets[key];
       var myBucket = new Bucket(aBucket);
        myBucket.save(function(err,obj) {
            if(err) {
              console.log(err);
            } else {
              console.log("obj was saved ");
              console.log(obj);
            }
        });
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

function getCurrentImages(lat, lang, distance, req, res, updateDatabse) {
    var instaToken = "1539375414.31aeb77.fb6ade7acfce42719298f3745c4791be"
    if(!distance) {
        distance = 1000;
    }
    request(
        {
            method: 'GET',
            uri: 'https://api.instagram.com/v1/media/search?' +
            'lat='+ lat
            + '&lng=' + lang
            + '&distance' + distance
            +'&access_token=' + instaToken
            ,
            gzip: false
        }
        , function (error, response, body) {
            console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
            if(!updateDatabse) {
                try {
                    var json = JSON.parse(body);
                    res.json(json.data);
                } catch (e) {
                    res.status(400).send("instagram could not send data");
                }
            } else {
                try {
                    var json = JSON.parse(body);
                    //console.log(json);
                    var myData = filterData(json);
                    console.log(myData);
                    for(var key in myData) {
                       console.log(myData[key].images);
                    }
                } catch (e)  {
                    console.log("no updates could be made to DB")
                }

            }
        }
    );
}

module.exports.getInstaImages = getCurrentImages;

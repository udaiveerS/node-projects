var request = require('request')

var aUrl = "http://localhost:9000/instaPics";

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
            // body is the decompressed response body
            console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
            try {
                var json = JSON.parse(body);
                console.log("got here");
                //console.log(json);
                if(updateDatabse) {

                    request({
                        url: aUrl,
                        method: "POST",
                        json: true,
                        headers: {
                            "content-type": "application/json",
                        },
                        body: json
                    }, function(err, repsonse, body) {
                       //console.log(err);
                        //console.log(response);
                        //console.log(body);
                    });
                }
                res.json(json.data);
            } catch (e) {
                res.status(400).send("instagram could not send data");
            }
        }
    );
}

module.exports.getInstaImages = getCurrentImages;

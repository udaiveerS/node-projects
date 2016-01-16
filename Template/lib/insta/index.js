/**
 * Created by udaiveer on 1/16/16.
 */

var request = require('request')


function getCurrentImages(lat, lang, distance, req, res) {
    var instaToken = "1539375414.31aeb77.fb6ade7acfce42719298f3745c4791be"
    if(!distance) {
        distance = 1000;
    }
    request(
        {
            method: 'GET'
            ,
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
                console.log(json);
                res.json(json.data);
            } catch (e) {
                res.status(400).send("instagram could not send data");
            }
        }
    );
}

module.exports.getInstaImages = getCurrentImages;

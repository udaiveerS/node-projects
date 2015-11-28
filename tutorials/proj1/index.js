//modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var Q = require('q'); 

var mimeTypes = {
    "html" : "text/html",
    "jpeg" : "image/jpeg",
    "jpg" : "image/jpeg",
    "png" : "image/png",
    "js" : "text/javascript",
    "css" : "text/css",
    "json" : "application/json"
};


http.createServer(function (req, res) {
    Promise.resolve(url.parse(req.url).pathname)
    .then(function(uri) {
        console.log("process path " + process.cwd() + " req.url " + req.url + " vs unescaped " + unescape(req.uri));
        var fileName = path.join(process.cwd(), unescape(uri));
        console.log("Loading " + fileName);
        return fileName;
    })
    .then(function(fileName) {
        console.log("Loading again " + fileName);
        return Q.nfcall(fs.lstat, fileName).then(function(stats) {
            if(stats.isFile()) {
                console.log(path.extname(fileName).split(".").reverse()[0]);
                var mimeType = path.extname(fileName).split(".").reverse()[0];

                var fileStream = fs.createReadStream(fileName);
                res.writeHead(200, {'Content-Type': mimeTypes[mimeType]});
                fileStream.pipe(res);
    
                fileStream.on("error", function() {
                    consle.log("error with the stream");  
                });

            } else if(stats.isDirectory()) {
                res.write(302, {
                    'Location' : 'index.html'
                });
                res.end();
            } else {
                res.write(500, {"Content-Type": "text/plain"});
                res.write('500 internal Error \n');
                res.end();
            }
        });
    })
    .then(function() {
        console.log("file writin success"); 
    })
    .catch(function(err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write("resource not found 404");
        res.end();
    });

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

var Jwt = require('./jwt'); 
var jwt = new Jwt("secret");
var mongo = require('mongodb').MongoClient;
var http = require('http'); 
var app = http.createServer(router);
var client = require('socket.io').listen(app).sockets;
app.listen(8080, () => { console.log('listening to port 8080'); });
var url = require('url'); 


//routing stuff 
var routes = {
    'GET': {
        '/': (req,res) => {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end('<h1>Hello world</h1>');
        }
    },
    'POST': { 
        '/api/login/': (req, res) => {
            var body = '';
            req.on('data', data => {
                body += data; 
            });

            req.on('end', data => {
                console.log(body);
                res.end();
            });
        }
    },
    'NA': (req,res) => {
        res.writeHead(404);
        res.end('Content not found!');
    }
};

//do all website routing
function router(req,res) {
    var baseURI = url.parse(req.url, true);
    var rootDir = __dirname; 
    var filePath = __dirname + (baseURI.pathname === '/' ? '/index.html' : baseURI.pathname);
    console.log(filePath);
    var resolveRoute = routes[req.method][baseURI.pathname];
    if(resolveRoute !== undefined) {
        req.queryParams = baseURI.query;
        resolveRoute(req,res);
    } else {
        routes.NA(req,res);
    }
}


//all jwt stuff
var obj = {
      "sub": "1234567890",
        "name": "John mambo",
          "admin": true
};

var encodedString = jwt.encode(obj);
console.log("encoded string is: " + encodedString);
console.log("decoded string is: " + jwt.decode(encodedString));


//socket.io 
mongo.connect('mongodb://127.0.0.1/chat', function(err,db) {
    if(err) throw err;
    
    client.on('connection', function(socket) {
        console.log('a connection made');
        var col = db.collection('messages');

        var sendStatus = (s) => {
            socket.emit('status',s);
        };

        col.find().limit(50).sort({_id: 1}).toArray(function(err, res) {
            if(err) throw err; 
            socket.emit('output',res);
        });

        socket.on('input', function(data) {

            if(false) {
                // check for jwt auth 
            } else {
                console.log(data);
                var newData = {message: data.msg, jwt: data.jwt, user: data.user, time: data.time};
                client.emit('output', [newData]);
                col.insert(newData,function(err, res) {
                    if(err) console.log("error storing in db");
                    else {
                      sendStatus({
                                message: "Message sent",
                      });
                    }
                });
            }
        });
    });
});



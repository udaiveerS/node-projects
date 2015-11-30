var Jwt = require('./jwt'); 
var jwt = new Jwt("secret");
var mongo = require('mongodb').MongoClient;
var http = require('http'); 
var app = http.createServer(router);
var client = require('socket.io').listen(app).sockets;
var url = require('url'); 
var fs = require('fs');
var path = require('path');
var qs = require('querystring');


app.listen(8080, () => { console.log('listening to port 8080'); });
var connectionString = 'mongodb://localhost:27017/chat';
var mimes = {
    '.html' :   'text/html',
    '.css'  :   'text/css',
    '.js'   :   'text/javascript',
    '.gif'  :   'image/gif',
    '.jpg'  :   'image/jpeg',
    '.png'  :   'image/png',
    '.json' :   'application/json'
};


// simple router implementation
var routes = {
    'GET': (req,res) => {
            var filePath = req.filePath; 
            console.log(filePath);
            fs.access(filePath, fs.F_OK, (error) => {
            if(!error) {
                fs.readFile(filePath, (error, content) => {
                    if(!error) {
                        var contentType = mimes[path.extname(filePath)];
                        res.writeHead(200, {'Content-type': contentType});
                        res.end(content, 'utf-8');
                    } else {
                        res.writeHead(500);
                        res.end("<h1>File not found</h1>");
                    }
                });
            } else {
                res.writeHead(404);
                res.end('Content not found!');
            }
        });
    },
    'POST': { 
        '/api/login/': (req, res) => {
            var body = '';
            req.on('data', data => {
                body += data; 
            });
            req.on('end', () => {
                console.log(body);
                var data = JSON.parse(body);
                console.log(data);
                mongo.connect(connectionString, function(err,db) {
                    if(!err) {
                       var collection = db.collection('users');
                       collection.findOne({ username : data.username}, function(err,user) {
                            if(!err) {
                                console.log("after the query");
                                if(user && (user.password === data.password)) {
                                    delete user.password;
                                    user.jwt = jwt.encode(user);
                                    console.log('users was found' + user);
                                    res.writeHead(200, {'Content-type': mimes['.json']});
                                    res.end(JSON.stringify({'jwt' : user.jwt}));
                                } else {
                                    res.writeHead(400, {'Content-type': mimes['.json']});
                                    res.end(JSON.stringify({'err' : 'bad information'}));
                                }
                            } else {
                                res.writeHead(400, {'Content-type': mimes['.json']});
                                res.end(JSON.stringify({'err' : 'resource not found'}));
                            }
                        });
                    } else {
                        console.log('error in POST /api/login');
                    }
                });
                console.log('in login after datable connect');
            });
        }
    },
    'NA': (req,res) => {
        res.writeHead(404);
        res.end('Content not found!');
    },
    'NO': (req,res) => {
        res.writeHead(504);
        res.end('Content not found!');
    }

};

//do all website routing for serving the staic files
function router(req,res) {
    var baseURI = url.parse(req.url, true);
    try {
        if(req.method === 'GET') {
            var filePath = __dirname + (baseURI.pathname === '/' ? '/index.html' : baseURI.pathname);
            req.filePath = filePath;
            console.log(req.filePath);
            routes.GET(req,res);
        }else if(req.method === 'POST') {
            console.log(baseURI);
            console.log(baseURI.pathname);
            routes.POST[baseURI.pathname](req,res);
        } else {
            routes.NA(req,res);
        }
    } catch(e) {
        routes.NA(req,res);
    }
}


//all jwt stuff
var obj = {
      sub: "1234567890",
      name: "John mambo",
      admin: true
};

var encodedString = jwt.encode(obj);
console.log("encoded string is: " + encodedString);
console.log("decoded string is: " + jwt.decode(encodedString));


//socket.io 
mongo.connect(connectionString, function(err,db) {
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



var Jwt = require('./lib/jwt');
var jwt = new Jwt("secret");
var mongo = require('mongodb').MongoClient;
var http = require('http'); 
var app = http.createServer(router);
var client = require('socket.io').listen(app).sockets;
var url = require('url'); 
var fs = require('fs');
var path = require('path');

var host = 'localhost';

// Custom modules under lib
app.listen(9000, () => { console.log('listening to port 9000'); });
var connectionString = 'mongodb://'+ (host) + ':27017/chat';

var mimes = {
    '.html' :   'text/html',
    '.css'  :   'text/css',
    '.js'   :   'text/javascript',
    '.gif'  :   'image/gif',
    '.jpg'  :   'image/jpeg',
    '.png'  :   'image/png',
    '.json' :   'application/json'
};

// serves all static files for website
var staticFiles = require('./lib/static');
    staticFiles = new staticFiles(mimes);
// deal with all login authentication
var loginModule = require('./lib/login');
    loginModule = new loginModule(connectionString);
// deal with signup databse / validity checks
var signupModule = require('./lib/signup');
    signupModule = new signupModule(connectionString);


var routes = {
    'GET': (req,res) => {
        "use strict";
        staticFiles.serveFiles(req,res);
    },
    'POST': {
        '/api/login/': (req, res) => {
            var body = '';
            req.on('data', data => {
                body += data; 
            });

            req.on('end', () => {
                console.log(body);
                try {
                    var user_password= JSON.parse(body);
                } catch(e) {
                    res.writeHead(400, {'Content-type': mimes['.json']});
                    res.end(JSON.stringify({'err' : 'bad Json sent to login'}));
                }
                loginModule.login(user_password)
                    .then((aUser) => {
                        if(aUser) {
                            delete aUser.password;
                            console.log(aUser);
                            var aJwt = jwt.encode(aUser);
                            res.writeHead(200, {'Content-type': mimes['.json']});
                            res.end(JSON.stringify({'jwt' : aJwt}));
                        } else {
          ;                  res.writeHead(400, {'Content-type': mimes['.json']});
                            res.end(JSON.stringify({'err' : 'resource not found'}));
                        }
                    })
                    .catch((err) => {
                        res.writeHead(400, {'Content-type': mimes['.json']});
                        res.end(JSON.stringify({'err' : 'login not successful'}));
                    });
            });
        },
        '/api/signup/' : (req,res) => {
            var body = '';
            req.on('data', data => {
                body += data; 
            });

            req.on('end', () => {
                console.log("got into the" + body);
                new Promise(function(resolve) {
                    var data = JSON.parse(body);
                    resolve(data);
                }).then(function(data) {
                    console.log("got into 2nd then " + data);
                    return signupModule.signup(data);
                }).then((userCredentials) => {
                        delete userCredentials.password;
                        res.writeHead(200, {'Content-type': mimes['.json']});
                        res.end(JSON.stringify(userCredentials));
                }).catch((exception) => {
                        res.writeHead(400, {'Content-type': mimes['.json']});
                        res.end(JSON.stringify({'err' : 'resource not found'}));
                });
            });
            //console.log('exit');
        },'/api/auth/' :(req,res) => {
            var body = '';
            req.on('data', data => {
                    body += data; 
                    //console.log(body);
            });
            
            req.on('end', () => {
                try {
                    //console.log(body);
                    var ajwt = JSON.parse(body);
                    //console.log(ajwt.jwt);
                    if(ajwt && jwt.decode(ajwt.jwt) === false) {
                        res.writeHead(404);
                        res.end('bad signature');
                    } else {
                        res.writeHead(200, {'Content-type': mimes['.json']});
                        res.end(body);
                    }
                }
                catch(e) {
                        res.writeHead(404);
                        res.end('exception thrown');
                }
            });
        }
    },
    'NA': (req,res) => {
        res.writeHead(404);
        res.end('stuff not found!');
    },
    'NO': (req,res) => {
        res.writeHead(504);
        res.end('no access found!');
    }

};

//do all website routing for serving the staic files
function router(req,res) {
    var baseURI = url.parse(req.url, true);
    //try {
        if(req.method === 'GET') {
            var filePath = __dirname + (baseURI.pathname === '/' ? '/index.html' : baseURI.pathname);
            req.filePath = filePath;
            //console.log(req.filePath);
            routes.GET(req,res);
        }else if(req.method === 'POST') {
            //console.log(baseURI);
            routes.POST[baseURI.pathname](req,res);
        } else {
            routes.NA(req,res);
        }
}


mongo.connect(connectionString, function(err,db) {
    if(err) throw err;
    
    client.on('connection', function(socket) {
        var col = db.collection('messages');

        var sendStatus = (s) => {
            socket.emit('status',s);
        };

        col.find().sort({_id: 1}).toArray(function(err, res) {
            if(err) throw err; 
            socket.emit('output',res);
        });

        socket.on('input', function(data) {

            if(false) {
                // check for jwt auth 
            } else {
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



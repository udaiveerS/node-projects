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
    '.json' :   'application/json',
    '.svg' :   'image/svg+xml'
};

/**
 * All custom modules imported from /lib
 * @type {*|exports|module.exports}
 */
// serves all static files for website
var StaticFiles = require('./lib/static'),
    staticFiles = new StaticFiles(mimes);
// deal with all login authentication
var LoginModule = require('./lib/login'),
    loginModule = new LoginModule(connectionString);
// deal with signup databse / validity checks
var SignupModule = require('./lib/signup'),
    signupModule = new SignupModule(connectionString);
// auth module takes key for JWT as paramater Key should be assigned via env varables
var Jwt = require('./lib/jwt'),
    jwt = new Jwt("secret");

/**
 * Function as the bare bones router for chat application
 * handels GET/POST and 404 errors. All request handlers
 * are sored as a routes object
 * @param req
 * @param res
 */
function router(req,res) {
    var baseURI = url.parse(req.url, true);
    if(req.method === 'GET') {
        req.filePath = __dirname + (baseURI.pathname === '/' ? '/views/index-2.html' : baseURI.pathname);
        routes.GET(req,res);
    }else if(req.method === 'POST') {
        //console.log(baseURI);
        routes.POST[baseURI.pathname](req,res);
    } else {
        routes.NA(req,res);
    }
}

var routes = {
    'GET': (req,res) => {
       staticFiles.serveFiles(req,res);
    },
    'POST': {
        '/api/login/': (req, res) => {
            var body = '';
            req.on('data', data => {
                body += data; 
            });

            req.on('end', () => {
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
                            res.writeHead(400, {'Content-type': mimes['.json']});
                            res.end(JSON.stringify({'err' : 'resource not found'}));
                        }
                    })
                    .catch(() => {
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
                }).catch(() => {
                        res.writeHead(400, {'Content-type': mimes['.json']});
                        res.end(JSON.stringify({'err' : 'resource not found during signup'}));
                });
            });
        },'/api/auth/' :(req,res) => {
            var body = '';
            req.on('data', data => {
                    body += data; 
            });
            
            req.on('end', () => {
                try {
                    var ajwt = JSON.parse(body);
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
                        res.end('error in authentication during session');
                }
            });
        }
    },
    'NA': (req,res) => {
        res.writeHead(404);
        res.end('the route was not found!');
    }
};


/**
 * Socket.io message event handeling all done
 * inside the mongo connection callback
 */
mongo.connect(connectionString, function(err,db) {
    if(err) throw err;
    
    client.on('connection', function(socket) {
        var col = db.collection('messages');

        col.find().sort({_id: 1}).toArray(function(err, res) {
            if(err) throw err; 
            socket.emit('output',res);
        });

        socket.on('input', function(data) {
            var newData = {message: data.msg, jwt: data.jwt, user: data.user, time: data.time};
            client.emit('output', [newData]);
            col.insert(newData);
        });
    });
});



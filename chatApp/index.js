var mongo = require('mongodb').MongoClient;
var http = require('http'); 
var app = http.createServer(router);
var client = require('socket.io').listen(app).sockets;
var url = require('url'); 
var fs = require('fs');
var path = require('path');
var faker = require('faker');

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


function getAvatar(newData) {
    return new Promise(function(resolve) {
        //console.log("in get Avatar");
        if(newData.default) {
            //console.log("in get Avatar 2");
            newData.title = faker.fake('{{name.jobTitle}}');
            newData.avatar = faker.fake('{{image.imageUrl}}');
            //console.log(newData.title);
            //console.log(newData.test1);
            //console.log(newData.avatar);
            newData.default = false;
            resolve(newData);
        } else {
            //console.log("in get Avatar 3");
            console.log(newData);
            resolve(newData);
        }
    });
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
                            //console.log(aUser);
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
                //console.log("got into the" + body);
                new Promise(function(resolve) {
                    var data = JSON.parse(body);
                    resolve(data);
                }).then(function(data) {
                    //console.log("got before avater" + data);
                    data.default = true;                 // initialize for faker
                    return getAvatar(data).then((newData) => {
                        //console.log("got into avatar");
                        console.log(newData);
                        return signupModule.signup(newData);
                    });
                }).then((userCredentials) => {
                        delete userCredentials.password;
                        res.writeHead(200, {'Content-type': mimes['.json']});
                        //console.log(userCredentials);
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

    var loginList = {};
    var socketList = {};

    function printStatus() {
        console.log("====================================");
        console.log(loginList);
        console.log(socketList);
        console.log("====================================");
        console.log("");
    }


/**
 * Takes a object with one to many mapping
 * and return an array with the objects
 */
var invert = function (obj) {

    var new_obj = {};

    for (var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            if(new_obj.hasOwnProperty([obj[prop]] )){
                new_obj[obj[prop]].push(prop);
            } else {
                new_obj[obj[prop]] = [prop];
            }
        }
    }

    return new_obj;
};

mongo.connect(connectionString, function(err,db) {
    if(err) throw err;

    client.on('connection', function(socket) {
        var col = db.collection('messages');

        socket.on('login', function(data) {
            if(!socketList.hasOwnProperty(socket.id)) {
                socketList[socket.id] = data.username;
            }

            if(loginList.hasOwnProperty(data.username)) {
                loginList[data.username].liveConnections++;
            } else {
                loginList[data.username] = {username: data.username, liveConnections: 1};
            }

            console.log("client login ", loginList[data.username]);
            printStatus();
            client.emit('client_login', data.username);
        });

        socket.on('logout', function(data) {
            if(loginList.hasOwnProperty(data.username)) {

                var user = loginList[data.username];
                user.liveConnections--;
                console.log("in logout");
                printStatus();
                if(user.liveConnections === 0) {
                    delete loginList[data.username];
                    console.log("in logout no more active connections");
                    printStatus();
                    client.emit('client-logout', data.username);
                }
            }
        });

        socket.on('disconnect', function(){
            if(socketList.hasOwnProperty(socket.id)) {
                var user = socketList[socket.id];
                delete socketList[socket.id];

                if (user && loginList.hasOwnProperty(user)) {
                    var userConnection =  loginList[user];
                    userConnection.liveConnections--;
                    console.log("disconnected connection");
                    printStatus();
                    if (userConnection.liveConnections === 0) {
                        delete loginList[user];
                        console.log("deleting id " + socket.id)
                        console.log("last disconnected connection");
                        printStatus();
                        client.emit('client-logout', user);
                    }
                }
            }
        });



        col.find().sort({_id: 1}).toArray(function(err, res) {
            if(err) throw err; 
            socket.emit('output',res);
        });


        //Array is not needed. Sockets.io provides a socket.id that persists until socket is disconnect.

        socket.on('input', function(data) {
            //console.log("date recieved" + data);
               if(jwt.decode(data.jwt) !== false) {

                   var newData = {
                        msg: data.msg,
                        jwt: data.jwt,
                        user: data.user,
                        time: data.time,
                        title: data.title,
                        avatar: data.avatar
                    };

                       client.emit('output', [newData]);
                       //console.log(data);
                       col.insert(data);
            }

        });
    });
});

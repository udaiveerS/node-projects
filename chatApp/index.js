var Jwt = require('./jwt'); 
var jwt = new Jwt("secret");
var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;

var obj = {
      "sub": "1234567890",
        "name": "John mambo",
          "admin": true
};

mongo.connect('mongodb://127.0.0.1/chat', function(err,db) {
    if(err) throw err;
    
    console.log("no erron on mongo");
    client.on('connection', function(socket) {
        console.log('a connection made');
        socket.on('input', function(data) {
            var col = db.collection('messages');
                console.log(data);
        });
    });
});


var encodedString = jwt.encode(obj);
console.log("encoded string is: " + encodedString);
console.log("decoded string is: " + jwt.decode(encodedString));

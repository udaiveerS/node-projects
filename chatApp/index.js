var Jwt = require('./jwt'); 
var jwt = new Jwt("secret");
var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;

var obj = {
      "sub": "1234567890",
        "name": "John mambo",
          "admin": true
};

client.on('connection', function(socket) {
    console.log('someone has connected');
});

var encodedString = jwt.encode(obj);
console.log("encoded string is: " + encodedString);
console.log("decoded string is: " + jwt.decode(encodedString));

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
                var newData = {message: data.msg, jwt: data.jwt};
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


var encodedString = jwt.encode(obj);
console.log("encoded string is: " + encodedString);
console.log("decoded string is: " + jwt.decode(encodedString));

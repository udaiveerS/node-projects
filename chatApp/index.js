var Jwt = require('./jwt'); 
var jwt = new Jwt("secret");

var obj = {
      "sub": "1234567890",
        "name": "John Doe",
          "admin": true
};

var encodedString = jwt.encode(obj);

console.log("encoded string is: " + encodedString);
console.log("decoded string is: " + jwt.decode(encodedString));

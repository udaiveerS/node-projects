
const crypto = require('crypto');

module.exports = function(key) {
    this.key = key; 
    
    function encodeBase64(str) {
        return new Buffer(str).toString('base64').toString('utf8');
    }

    function decodeBase64(str) {
        return new Buffer(str, 'base64').toString('utf8');
    }
    
    function stringify(obj) {
        return JSON.stringify(obj);
    }

    var alg = {"alg": "HS256", "typ": "JWT"};

    return {
        encode:(obj) => {
            var result = "";

            var header = encodeBase64(stringify(alg));
            result += header + ".";
            
            var body = encodeBase64(stringify(obj));
            result += body + ".";

            var checkSumStr = header + "."  + body + key;

            var hash = crypto.createHash('sha256');

            var checkSum = hash.update(checkSumStr)
                .digest('base64').toString('utf8');

            result += checkSum; 

            return result;
        },
        decode:(str) => {
            var jwtArr = str.split("."); 
            console.log(decodeBase64(jwtArr[0]));
            console.log(decodeBase64(jwtArr[1]));
            console.log(decodeBase64(jwtArr[2]));
        }
    };
};



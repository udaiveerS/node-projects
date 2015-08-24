var mongoose = require('mongoose');
var crypto = require('crypto'); 
var jwtToken = require('jsonwebtoken'); 

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    hash: String,
    salt: {type: Number, default: 0}
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex'); 

    this.hash = crypto.pbkdf25Sync(password, this.salt, 1000, 64).toString('hex'); 
};

UserSchema.methods.validatePassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash == hash; 
};

UserSchema.methods.generateJwt = function() {
    var today = new Date(); 
    var exp = new Date(today); 
    exp.setDate(today.getDate() + 60); 
    console.log('today ' + today.DateString()); 
    console.log('exp ' + exp.DateString()); 
    console.log('exp in sec ' + exp.getTime()/1000); 

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000), 
    }, 'Seret'); 
}; 

mongoose.model('User', UserSchema);


var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser'); 
var jwt = require('jsonwebtoken');

var app = express();
var user = {username: 'admin' , password: 'password'}; 
var secret = "fadsfsfsafs";

app.use(cors());
app.use(bodyParser.json());

app.get('/random-user', function(req, res) {
    var user = faker.helpers.createCard();
    user.avatar = faker.image.avatar();
    res.json(user);
});

app.post('/login', authenticate, function(req, res, next) {
    var token = jwt.sign({
        username: user.username
    }, secret); 

    res.json({
            token: token,
            user: user
    });
});


function authenticate(req, res, next) {
    var body = req.body;
    console.log(body); 
    console.log(user);
    if(body.username === user.username && body.password === user.password) {
        next();
    } else {
        res.status(400).end('invalid username or password'); 
    }
}

app.listen(3000, function() {
    console.log('App listening on localhost:3000');
});


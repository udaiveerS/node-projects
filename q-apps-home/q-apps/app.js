var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var medium = require('medium-sdk')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var client = new medium.MediumClient({
  clientId: '132d940695be',
  clientSecret: 'af9aa97aa69364beb36225b79b231c882e537ca1'
});

var url = client.getAuthorizationUrl('secretState', 'https://q-apps.io/api/medium', [
  medium.Scope.BASIC_PROFILE, medium.Scope.PUBLISH_POST
]);


var qs = require('qs');
var https = require('https');

var data  = {
    code: "f79dd700c137",
    client_id: '132d940695be',
    client_secret: 'af9aa97aa69364beb36225b79b231c882e537ca1',
    grant_type: 'authorization_code',
    redirect_uri: "https://q-apps.io/api/medium"
};

console.log(qs.stringify(data));
//console.log(url);
getAccessToken(data);

function getAccessToken(params) {
  var requestParams = {
    host: 'api.medium.com',
    port: 443,
    method: 'POST',
    path: '/v1/tokens',
    grant_type: "authorization_code",
    data: qs.stringify(params)
  };

  var req = https.request(requestParams, function (res) {
    var obj = '';
    res.on('data', function (data) {
      obj += data;
      console.log(data);
    });

    res.on('end', function () {
      var payload;
      try {
        payload = JSON.parse(obj);
        console.log(payload);
      } catch (err) {
        console.log(err);
      }
    });

  }).on('error', function (err) {
    console.log(err);
  });

  req.end();
}

//var request = require('request');
//
//var params = {
//  code: "",
//  client_id: "",
//  client_secret: "",
//  grant_type: "",
//  redirect_uri: "",
//};

//var options = {
//  host: 'api.medium.com',
//  port: 443,
//  path: '/v1/tokens',
//  method: 'POST',
//  contentType: 'application/x-www-form-urlencoded',
//  accept: 'application/json',
//  data: qs.stringify(params)
//};
//
//console.log("Start");
//
//var x = http.request(options, function(res) {
//  console.log("Connected");
//  var body = ""
//
//  res.on('data', function (data) {
//    body += data;
//    console.log(data);
//  });
//
//  res.on('end', function () {
//    var payload;
//    try {
//      console.log(body);
//      payload = JSON.parse(body);
//      console.log(payload);
//    } catch (err) {
//
//    }
//
//  });
//});


module.exports = app;

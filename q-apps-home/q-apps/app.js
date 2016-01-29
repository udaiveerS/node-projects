var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var medium = require('./lib/medium');

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

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var client = new medium.MediumClient({
  clientId: 'e7d362f62e11',
  clientSecret: 'f0134b407c0b443415390fd8216cac6d3a8fb957',
  refreshToken:'2681bd8f34e956726880cff1cfbf364e2b682f80afa62fe3e06dd696de7e4788d',
  accessToken: '2ab4c477aa51d38b2514e63e3557ab1e6a51a84e52740542000e9d655773e7e30'
});

consoel.log(client);
var redirectURL = 'http://example.com/code';

//var url = client.getAuthorizationUrl('secretState', redirectURL, [
//  medium.Scope.BASIC_PROFILE, medium.Scope.PUBLISH_POST
//]);
//
//console.log(url);

client.exchangeRefreshToken(function(err,tokens) {
  console.log(err);
  console.log(tokens);
  client.getUser(function (err, user) {
   console.log(user) ;
  });
});


//client.exchangeAuthorizationCode('28d08755869d',redirectURL, function (err, token) {
//  console.log(token);
//  console.log(err);
//  client.refreshToken = token && token.refresh_token;
//  client.getUser(function (err, user) {
//      client.createPost({
//        userId: user.id,
//        title: 'A new post',
//        contentFormat: medium.PostContentFormat.HTML,
//        content: '<h1>A New Post</h1><p>This is my new post.</p>',
//        publishStatus: medium.PostPublishStatus.DRAFT
//      }, function (err, post) {
//        console.log(token, user, post)
//      })
//  })
//});

module.exports = app;

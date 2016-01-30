var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/index');
var users = require('./routes/users');
var nodeCli = require('./lib/node-cli');
var $ = require('jquery');
var jsdom = require("jsdom");
var hbs = require('hbs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.use(cors());
app.use('/', routes);
app.use('/users', users);



var posts = [];

scrapeMedium()
  .then((array) => {
    posts = array;
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/posts', function(req,res) {
  res.json(posts);
});

var mins = 60;
setInterval(function() {
 scrapeMedium()
  .then((array) => {
    posts = array;
  })
  .catch((err) => {
    console.log(err);
  });
}, mins * 60 * 60);


/**
 * Scrapes my medium page and return an array of objects
 * {title: 'title', date: 'date'}]
 * @returns {Promise}
 */
function scrapeMedium() {
  return new Promise(function(resolve, reject) {
    nodeCli.execute("phantomjs " + __dirname + "/bin/test.js")
      .then((out) => {
        console.log(out);
        return nodeCli.execute("cat " + __dirname + "/bin/medium.txt");
      })
      .then((out) => {
        jsdom.env(
          out,
          ["https://code.jquery.com/jquery-2.2.0.min.js"],
          function (err, window) {
            window.$('div.block.block--inset.block--list').each(function (elem) {
              //console.log(window.$( this ).text());
              var title = window.$(this).find('h3').text();
              var date = window.$(this).find('span>a.link.link--darken').text();
              var url = window.$(this).find('article.postArticle>a').attr('href');
              //console.log(title);
              //console.log(date);
              posts.push({title: title, date: date, url: url});
              resolve(posts);
            });
          }
        );
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  })
});

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
module.exports = app;

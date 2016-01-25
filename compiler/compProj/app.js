var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var routes = require('./routes/index');
var users = require('./routes/users');
var hbs = require('hbs');
var app = express();
var bash = require("./lib/node-cli");
var crypto = require("crypto");
var compiler = require("./lib/compiler-factory");

// set up env variable
app.set('env', "development");

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//register all hbs partials/ tmplates
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/compiler');
hbs.registerPartials(__dirname + '/views/partials/about');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var router = express.Router();

router.post('/compile', function(req, res, next) {
  try {
    var txt = req.body.txt;
    var id = crypto.randomBytes(14).toString('hex');
    // create a compiler factory
    var aCompiler = compiler.compilerFactory(id, txt);
  } catch (e) {
    res.status(400);
    res.json({"out": "invalid text format", "err": "invalid text format"});
  }
  // create a file id.txt with the code which is in txt variable
  var responseObj = {out: "", err: "", j: ""};
  aCompiler.writeTxt()
    .then(() => {
      //execute the bash script to compile and run to produce all the files/errors/outputs
      return bash.execute(aCompiler.compileCommand);
    })
    .then(() => {
      //execute command to get the .out file
      return bash.execute(aCompiler.readOutFileCommand);
    })
    .then(res => {
      console.log(res);
      responseObj.out = res;
      //execute command to get the .j file
      return bash.execute(aCompiler.readJFileCommand)
    })
    .then(res => {
      console.log(res);
      responseObj.j = res;
      //send the json object
      res.json(responseObj);
      // remove all files associated with program
      return bash.execute(aCompiler.cleanUpCommand);
    })
    .catch(err => {
     console.log(err);
      res.status(400);
      res.json({"out": "invalid text format", "err": "invalid text format"});
    });
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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;


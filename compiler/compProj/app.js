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

function compilerFactory(fileName, fileTxt = 'sample txt') {
  var jFile = fileName + ".j";
  var txtFile = fileName + ".txt";
  var outFile = fileName + ".out";

  var compileCommand = "../test_script/testScriptBash " + fileName;
  var readOutFile = "cat " + outFile;
  var readJFile = "cat " + jFile;
  var cleanUp = "rm " + jFile + " " + txtFile + " " + outFile;

  function writeTxt(txt = fileTxt) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(txtFile, txt , (err) => {
        if (err) reject(err);
        resolve('saved')
      });
    });
  }

  return {
    jFile: jFile,
    txtFile: txtFile,
    outFile: outFile,
    writeTxt: writeTxt,
    compileCommand: compileCommand,
    readOutFileCommand: readOutFile,
    readJFileCommand: readJFile,
    cleanUpCommand: cleanUp
  }
}

var compiler = compilerFactory('bool_test2');

var compileCommand = "../test_script/testScriptBash bool_test";
bash.execute(compileCommand)
    .then(function(res) {
      console.log(res);
    }, function(err) {
      console.log("err" + err);
    });

//var AbasePath = "../test_script/TestScript.jar";
//var a ='java -jar ../test_script/TestScript.jar ../test_script/bool_test.txt';

module.exports = app;


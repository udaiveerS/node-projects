var express = require('express');
var router = express.Router();
var path = require('path');


/**
 * This option sets the manual path for the 
 * html files that are requested by the Angular
 * app and sent through Express 
 * */

var options = {
    root: path.join(process.cwd(), '/views/')
};


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', options, function(err) {
        if(err) {
        res.status(err.status).end();
        }
    });
});

/** This function will directly map 
 * a templateUrl from angulat to the 
 * corresponding resource on the server
 * */
router.get('/partials/:name', function(req, res, next) {
    var name = req.params.name; 
    var filePath = path.join('partials/', name+'.html');
    console.log(filePath);
    res.sendFile(filePath, options, function(err) {
        if(err) {
            res.status(err.status).end();
        }
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(process.cwd(), '/views/index.html'));
});

/** This function will directly map 
 * a templateUrl from angulat to the 
 * corresponding resource on the server
 * */
router.get('/partials/:name', function(req, res, next) {
    var name = req.params.name; 
    console.log(name + " in router. get file");
    res.sendFile(path.join(process.cwd(), '/views/partials/', name +'.html'));
});

module.exports = router;

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    console.log("sen file");
    res.sendfile('index.html');
});


module.exports = router;






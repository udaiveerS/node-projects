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
 * a templateUrl from angular to the 
 * corresponding resource on the server
 * */
router.get('/partials/:name', function(req, res, next) {
    var name = req.params.name; 
    var filePath = path.join('partials/', name+'.html');
    res.sendFile(filePath, options, function(err) {
        if(err) {
            res.status(err.status).end();
        }
    });
});


//get access to the models defined in the models folder  
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


router.get('/posts', function (req, res, next) {
    Post.find(function(err, posts) {
        if(err) { return next(err); }

        res.json(posts);
    });
});

router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) { 
        if(err) { return next(err); }

        res.json(post);
    });
});

router.param('post', function(req, res, next, id) {
   var query = Post.findById(id);

   query.exec(function(err, post) { 
       if(err) { return next(err); }
       if(!post) { return next(new Error('can\'t find post')); }

       req.post = post;
       return next(); 
   });
});

router.delete('/posts/:post', function(req, res, next) {
    Post.findOneAndRemove(req.post.id, function(err, doc, result) {
        if(err) { console.log("err in delete"); return next(new Error('can\'t delete post')); }

        res.json(doc);
    });   // executes
});
module.exports = router;

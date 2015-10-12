/**
 * Created by ahtasham on 01/01/15.
 */
var cmFunctions = require('./commonFunctions');
var Posts = require('./../models/posts');

/* Show Post eg: javascript-tips-12133342  */
exports.getSinglePost = function(req, res){
    var obj = {
        username: cmFunctions.usernameReg(req.params.username),
        postUrl: cmFunctions.urlReg(req.params.postUrl)
    };

    var posts = new Posts(obj);
    posts.getSinglePost(function(err, post){
        if(err) {
            res.redirect('/404');
        } else {
            res.render('post/post', {
                title: post.Title,
                session: req.session,
                userProfile: req.userProfile,
                categories: req.userCategory,
                postObj: post,
                username: obj.username
                });
        }
    });
};

/* Upsate Post */
exports.updatePost = function(req, res) {
    var obj = {
        personId: req.session.personId,
        postUrl: cmFunctions.urlReg(req.params.postUrl),
        details: cmFunctions.commonRmSpace(req.body.details)
    };

    var posts = new Posts(obj);
    posts.updatePost(function(err, post){
        if(err){
            res.json({
                msg: err
            })
        } else {
            res.json({
                msg: post
            })
        }
    });
};
exports.deletePost = function(req, res) {
    var obj = {
        personId: req.session.personId,
        postUrl: cmFunctions.urlReg(req.params.postUrl)
    };

    var posts = new Posts(obj);
    posts.deletePost(function(err, post){
        if(err){
            res.json({
                msg: err
            })
        } else {
            res.json({
                msg: post
            })
        }
    });
};












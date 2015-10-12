/**
 * Created by ahtasham on 31/12/14.
 */
var Posts = require('./../models/posts');
var Follow = require('./../models/follow');

exports.index = function(req, res) {
    if(!req.session.user && !req.session.rid) {
        res.render('home/index1', {
            title: 'Welcome To NodeBlog - A Social Blog',
            session: req.session
        });
    } else {

        res.render('home/index2', {
            title: 'NodeBlog',
            userProfile: req.userProfile,
            session: req.session,
            categories: req.userCategory
        });
    }
};

exports.homePosts = function(req, res){
    var obj = {
        personId: req.session.personId
    };
    var posts = new Posts(obj);
    posts.getHomePosts(function(err, posts){
        if(err){
            res.json({
                msg: err
            })
        } else {
            res.json(posts);
        }
    });
};

exports.getSuggestions = function(req, res) {
    var obj = {
        personId: req.session.personId
    };
    var follow = new Follow();
    follow.getSuggestions(obj, function(err, people){
        if(err) {
            res.json({
                msg: err
            });
        } else {
            res.json(people);
        }
    });
};


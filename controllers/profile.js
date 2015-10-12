/**
 * Created by ahtasham on 22/01/15.
 */
var cmFunctions = require('./commonFunctions');
var Person = require('./../models/person');
var Posts = require('./../models/posts');

/* Person landing page */
exports.index = function(req, res) {
    var username = req.params.username;
    username = cmFunctions.usernameReg(username);

    res.render('profile/profile', {
        title: username,
        session: req.session,
        userProfile: req.userProfile,
        categories: req.userCategory
    });
};

exports.getUserProfile = function(req, res, next) {
    var username = req.params.username;
    username = cmFunctions.usernameReg(username);

    var person = new Person(username, req.session.personId ? req.session.personId : '');
    person.getProfileByUsername(function(err, data){
        if(err) {
            res.send('There was an error ' + err);
        } else {
            if(!data.userProfile.hasOwnProperty('Name')) {
                res.redirect('/404');
            } else {
                req.userProfile = data.userProfile;
                req.userCategory = data.userCategory;
                next();
            }
        }
    });
};


/* GET All the posts of User By Username */
exports.getUserPosts = function(req, res) {
    var username = req.params.username;
    username = cmFunctions.usernameReg(username);
    var posts = new Posts(username);
    posts.getPostsByUsername(function(err, posts){
        if(err){
            res.json({
                msg: err
            });
        } else {
            res.json(posts);
        }
    });
};








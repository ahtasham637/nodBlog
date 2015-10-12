/**
 * Created by ahtasham on 06/02/15.
 */
var Posts = require('./../models/posts');
var cmFunctions = require('./commonFunctions');

exports.index = function(req, res) {
    var obj = {
        username: cmFunctions.usernameReg(req.params.username),
        catUrl: cmFunctions.urlReg(req.params.category)
    };
    var posts = new Posts(obj);
    posts.getPostsByCategory(function(err, catPosts){
        if(err) {
            res.send('Something went wrong');
        } else {
            res.render('postsByCategory/postsByCategory', {
                title: 'hello',
                session: req.session,
                userProfile: req.userProfile,
                categories: req.userCategory,
                posts: catPosts
            });
        }
    });
};
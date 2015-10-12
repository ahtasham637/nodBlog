/**
 * Created by ahtasham on 26/01/15.
 */
var follow = require('./../models/follow');

exports.followUser = function(req, res){
    var username = req.params.username;
    if(username !== req.session.user) {
        var followUser = new follow(req.session.personId, username);
        followUser.Follow(function(err, data){
            if(err) {
                res.json({
                    msg: err
                });
            } else {
                res.json({
                    msg: data
                });
            }
        });
    } else {
        res.json({
            msg: 'Something went wrong'
        });
    }
};
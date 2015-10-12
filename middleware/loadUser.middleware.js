/**
 * Created by ahtasham on 04/01/15.
 */
var LoadUser = require('./../models/loadUser');

module.exports = {
    loadUserOwnProfile: function(req, res, next) {
        if(!req.session.user && !req.session.rid) {
            next();
        } else {
            var loadUser = new LoadUser(req.session);
            loadUser.loadUserData(function(err, data){
                if(err) {
                    res.send(err);
                } else {
                    req.userProfile = data.userProfile;
                    req.userCategory = data.cats;
                    next();
                }
            });
        }
    }
};
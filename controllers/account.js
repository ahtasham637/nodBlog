/**
 * Created by ahtasham on 01/01/15.
 */
var User = require('./../models/user');
/* Show profile account page */
exports.showAccount = function(req, res){

    res.render('account/account', {
        title: 'Account Settings',
        userProfile: req.userProfile,
        session: req.session,
        categories: req.userCategory
    });
};

exports.changePassword = function(req, res) {
    var postObject = {
        oldPassword: '',
        newPassword: ''
    };

    for(var prop in postObject) {
        if(req.body.hasOwnProperty(prop)) {
            if(!req.body[prop]) {
                res.send('Fill all the fields');
            }
            postObject[prop] = req.body[prop];
        } else {
            res.send('There was an error please try again later.');
        }
    }
    postObject.rid = req.session.rid;

    var user = new User(postObject);
    user.ChangePassword(function(err, total){
        if(err) {
           res.send('Something went wrong ' + err);
        } else
        {
           if(total == 0) {
               res.send('Your old password was incorrect');
           }
           res.redirect('/account');
        }
    });
};

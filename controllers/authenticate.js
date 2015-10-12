/**
 * Created by ahtasham on 01/01/15.
 */
var Authenticate = require('../models/authenticate');

//signup
exports.signup = function(req, res) {
    var reqObj = {
        signupfullName: '',
        signupEmail: '',
        signupUsername: '',
        signupPassword: ''
    };

    var signUpObj = {};

    for(var prop in reqObj) {
        if(!req.body.hasOwnProperty(prop)) {
            return res.send('Fill all the fields.')
        }
    }

    signUpObj.Email = req.body.signupEmail;
    signUpObj.Name = req.body.signupfullName;
    signUpObj.Username = req.body.signupUsername;
    signUpObj.Password = req.body.signupPassword;

    var authenticate = new Authenticate(signUpObj);

    authenticate.signUp(function(err, data){
        if(err) {
            res.send('something went wrong: ' + err);
        } else
        {
            req.session.rid = data.user['@rid'];
            req.session.personId = data.person['@rid'];
            req.session.user = data.user.Username;
            req.session.status = data.user.Status;

            res.redirect('/update');
        }
    });
};

//login
exports.login = function(req, res) {

    if(!req.body.loginUser || !req.body.loginPassword) {
        return res.send('Fill all the fields in login');
    } else {
        var loginObj = {
            Username: req.body.loginUser,
            Password: req.body.loginPassword
        };

        var authenticate = new Authenticate(loginObj);

        authenticate.login(function(err, data){
            if(err) {
                res.send('something went wrong: ' + err);
            } else {
                req.session.rid = data[0]['@rid'];
                req.session.personId = data[1]['@rid'];
                req.session.user = data[0].Username;
                req.session.status = data[0].Status;

                res.redirect('/');
            }
        });
    }
};

//logout
exports.logout = function(req, res) {
    req.session.destroy(function(err){
        if(err) {
            res.send('There was an error');
        }
    });
    res.redirect('/');
};
/**
 * Created by ahtasham on 31/12/14.
 */
var db = require('./connect');
var md5 = require('MD5');
var cmFunctions = require('./../controllers/commonFunctions');
var User = require('./user');
var Person = require('./person');



//Authenticate class
function Authenticate(obj) {
    this.obj = obj;
    //signup
    this.signUp = function(callback) {

        this.obj.Status = 1;
        this.obj.Time = new Date().getTime();
        this.obj.Password = md5(this.obj.Password);
        this.obj.Name = cmFunctions.commonRmSpace(this.obj.Name);
        var regFullName = new RegFullName(this.obj.Name);
        this.obj.Name = regFullName.regName();

        var user = new User(this.obj);
        user.chkUser(function(err, data){
            if(err) {
                return callback('The email or username you entered is not available.');
            } else {
                var insertUser = user.insertUser(function(err, userD){
                    if(err) {
                        return callback(err);
                    } else {
                        var person = new Person(obj);
                        person.insertPerson(userD, function(err, pers){
                            if(err) {
                                return callback(err);
                            } else {
                                var sessObj = {
                                    user: userD,
                                    person: pers
                                };
                                return callback(null, sessObj);
                            }
                        });
                    }
                });
            }
        });
    };
    //login
    this.login = function(callback) {

        this.obj.Password = md5(this.obj.Password);

        db.query('SELECT EXPAND( $c ) LET ' +
            '$a = ( SELECT FROM User where Username = "'+ this.obj.Username +'" And Password = "' + this.obj.Password + '" ), ' +
            '$b = ( SELECT FROM Person where User.Username = "'+ this.obj.Username +'" And User.Password = "' + this.obj.Password + '" ), ' +
            '$c = UNIONALL( $a, $b )').then(function(user)
        {
            if(user.length > 0) {
                return callback(null, user);
            } else {
                return callback('The username or password was incorrect');
            }

        }).catch(function(err){
            return callback(err);
        });
    }
}


function RegFullName(name) {
    this.fullName = name;
    this.regName = function() {
        var str = this.fullName.replace(/[`~!@#$%^&*()_|+\.-=?;:'",<>\{\}\[\]\\\/]/gi, '');
        return str;
    }
}

module.exports = Authenticate;







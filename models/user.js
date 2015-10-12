/**
 * Created by ahtasham on 31/12/14.
 */
var db = require('./connect');
var md5 = require('MD5');

function User(obj){
    this.obj = obj;

    this.chkUser = function(callback) {
        db.query('select from User where Email=:email OR Username=:username', {
            params: {
                email: this.obj.Email,
                username: this.Username
            }
        }).then(function (results){
            if(results.length > 0) {
                return callback(results);
            } else
            {
                return callback(null, results);
            }
        }).catch(function(err){
            console.log(err);
            return callback(err);
        });
    };
    this.insertUser = function(callback) {
        db.insert().into('User').set({
            Email: this.obj.Email,
            Username: this.obj.Username,
            Password: this.obj.Password,
            Status: this.obj.Status,
            Time: this.obj.Time
        }).one().then(function(user){
            return callback(null, user);
        }).catch(function(err){
            return callback(err);
        });

    };
    this.ChangePassword = function(callback){
        var encOld = md5(this.obj.oldPassword);
        var encNew = md5(this.obj.newPassword);

        // Update new password
        db.update('User').set({
            Password: encNew
        }).where({
            "@rid": this.obj.rid,
            Password: encOld
        }).scalar().then(function(total){
            console.log(total);
            return callback(null, total);
        }).catch(function(err){
            console.log(err);
            return callback(err);
        });
    };
}

module.exports = User;
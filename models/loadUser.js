/**
 * Created by ahtasham on 29/01/15.
 */
var db = require('./connect');

//load userdetails middleware
function LoadUser (obj) {
    this.obj = obj;

    this.loadUserData = function(callback) {
        var retObj = {
            userProfile: '',
            cats: ''
        };
        var userProfile = {
            Name: '',
            Profession: 'example',
            Organisation: 'example, Inc',
            Hobby: '',
            About: '',
            TotalCategories: '',
            TotalPosts: '',
            TotalFollowers: '',
            Location: '',
            Photo: '5fce02648a742badb5905601b22098c9.png',
            Username: ''
        };
        var cats = [];

        db.query('SELECT EXPAND( $g ) LET ' +
        '$a = ( SELECT FROM Person where User = ' + this.obj.rid + ' ), ' +
        '$b = ( SELECT Username FROM '+ this.obj.rid +' ), ' +
        '$c = ( SELECT count(*) as TotalCategories FROM Category where Person = '+ this.obj.personId +'), ' +
        '$d = ( SELECT outE("Wrote").size() as TotalPosts FROM '+ this.obj.personId +'), ' +
        '$e = ( SELECT inE("Follow").size() as TotalFollowers FROM '+ this.obj.personId +'), ' +
        '$f = ( SELECT FROM Category where Person = '+ this.obj.personId +'), ' +
        '$g = UNIONALL( $a, $b, $c, $d, $e, $f )').then(function(user)
        {
            // userProfile
            if(user.length > 0) {
                for(var i=0; i<user.length; i++) {
                    for (var prop in userProfile) {
                        if (user[i].hasOwnProperty(prop)) {
                            userProfile[prop] = user[i][prop];
                        }
                    }
                }
                retObj.userProfile = userProfile;

                // Categories
                user.forEach(function(entry){
                    if(typeof entry === 'object' && entry['@class'] === 'Category') {
                        cats.push(entry);
                    }
                });
                retObj.cats = cats;
            }
            return callback(null, retObj);
        }).catch(function(err){
            return callback(err);
        });
    };
}
module.exports = LoadUser;
/**
 * Created by ahtasham on 28/01/15.
 */
var db = require('./connect');

function Person(obj, personId) {
    this.obj = obj;
    this.personId = personId;
    var parent = this;
    //insert
    this.insertPerson = function(user, callback) {
        //Insert into Person
        db.insert().into('Person').set({
            User: user['@rid'],
            Name: parent.obj.Name,
            Time: parent.obj.Time
        }).one().then(function(profile){
            return callback(null, profile);
        }).catch(function(err){
            return callback(err);
        });
    };

    //Update Information
    this.updateInfo = function(rid, callback) {
        var updateObj = {
            Profession: '',
            Organisation: '',
            Hobby: '',
            About: '',
            Location: ''
        };

        var regName = new RegData(parent.obj.Name);
        parent.obj.Name = regName.RegFullName();

        for (var prop in updateObj) {
            if (parent.obj.hasOwnProperty(prop)) {
                var regVal = new RegData(parent.obj[prop]);
                parent.obj[prop] = regVal.RegValue();
            }
        }

        parent.obj.Updated_Time = new Date().getTime();

        db.update('Person').set(parent.obj).where({
            User: rid
        }).scalar().then(function(userProfile){
            return callback(null, userProfile);
        }).catch(function(err){
            return callback(err);
        });
    };

    //get Person Profile By Username
    this.getProfileByUsername = function(callback) {
        var retObj = {
            userProfile: '',
            userCategory: ''
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
            isFollowing: '',
            Location: '',
            Photo: '5fce02648a742badb5905601b22098c9.png',
            Username: ''
        };
        var cats = [];
        db.query('SELECT EXPAND( $h ) LET ' +
        '$a = ( SELECT FROM Person where User.Username = "' + parent.obj + '" ), ' +
        '$b = ( SELECT Username FROM User where Username = "'+ parent.obj +'" ), ' +
        '$c = ( SELECT count(*) as TotalCategories FROM Category where Person.User.Username = "'+ parent.obj +'"), ' +
        '$d = ( SELECT outE("Wrote").size() as TotalPosts FROM Person where User.Username = "'+ parent.obj +'"), ' +
        '$e = ( SELECT inE("Follow").size() as TotalFollowers FROM Person where User.Username = "'+ parent.obj +'"), ' +
        '$f = ( select out as isFollowing from Follow where out = "'+ parent.personId +'"  And in.User.Username = "'+ parent.obj +'"), ' +
        '$g = ( SELECT FROM Category where Person.User.Username = "'+ parent.obj +'"), ' +
        '$h = UNIONALL( $a, $b, $c, $d, $e, $f, $g )').then(function(user)
        {
            if(user[0]['@class'] === 'Person') {
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
                retObj.userCategory = cats;
            }
            return callback(null, retObj);
        }).catch(function(err){
            return callback(err);
        });
    };
}

function RegData(value) {
    this.value = value;
    this.RegFullName = function() {
        var str = this.value.replace(/[`~!@#$%^&*()_|+\.-=?;:'",<>\{\}\[\]\\\/]/gi, '');
        return str;
    };
    this.RegValue = function() {
        var str = this.value.replace(/[`~!@#$%^*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, '');
        return str;
    };
}

module.exports = Person;
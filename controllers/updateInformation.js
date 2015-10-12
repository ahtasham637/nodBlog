/**
 * Created by ahtasham on 01/01/15.
 */
//Controller
/* Show profile Update page */
var Person = require('./../models/person');
var cmFunctions = require('../controllers/commonFunctions');

// Show update
exports.index = function(req, res){
    //get Profile
    res.render('update/update', {
        title: 'Update Your Profile',
        userProfile: req.userProfile,
        session: req.session,
        categories: req.userCategory
    });
};


// POST // Update Profile Information
exports.updateInformation = function(req, res) {
    var updateInfo = {
        Name: '',
        selectProfession: '',
        Profession: '',
        Organisation: '',
        Hobby: '',
        About: '',
        Location: ''
    };

    for (var prop in updateInfo) {
        if(req.body.hasOwnProperty(prop)) {
            updateInfo[prop] = cmFunctions.commonRmSpace(req.body[prop]);
        } else {
            delete updateInfo[prop];
        }
    }

    if(req.files && req.files.Photo) {
        if(req.files.Photo.truncated == true) {
            res.send('2 MB photos are allowed');
        } else
        {
            updateInfo.Photo = req.files.Photo.name;
        }
    }

    if(updateInfo.selectProfession && updateInfo.Profession) {
        if (updateInfo.selectProfession === 'student') {
            updateInfo.Profession = updateInfo.Profession + ' Student';
        }
        delete updateInfo.selectProfession;
    } else {
        delete updateInfo.selectProfession;
    }

    if (updateInfo.Location) { // Location
        var splitLocation = '';
        splitLocation = updateInfo.Location.split(', ');
        updateInfo.Location = splitLocation.shift() + ', ' + splitLocation.pop();
    }
    var person = new Person(updateInfo);
    person.updateInfo(req.session.rid, function(err, data){
        if(err) {
            res.send('something went wrong ' + err);
        } else {
            res.redirect('/update');
        }
    });
};

/**
 * Created by ahtasham on 04/01/15.
 */
var multer = require('multer');
var fs = require('fs');

//photo Uploading
module.exports = {
    uploadProfilePhoto: multer({
        limits: {
            files: 1,
            fileSize: 2000000
        },
        onFileUploadStart: function (file) {
            //if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {} else {return false;}
            switch (file.mimetype) {
                case 'image/jpeg':
                    break;
                case 'image/jpg':
                    break;
                case 'image/png':
                    break;
                case 'image/gif':
                    break;
                default:
                    return false;
            }
        },
        dest: './public/bucket/',
        onFileSizeLimit: function (file) {
            console.log('Failed: The photo is too big. ', file.originalname);
            fs.unlinkSync('./' + file.path); // delete the partially written file
        }
    }),
    uploadPostPhoto: function(req, res, next) {
        var upload = multer({
            limits: {
                files: 1,
                fileSize: 2000000
            },
            includeEmptyFields: false,
            onFileUploadStart: function (file) {
                //if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {} else {return false;}
                switch (file.mimetype) {
                    case 'image/jpeg':
                        break;
                    case 'image/jpg':
                        break;
                    case 'image/png':
                        break;
                    case 'image/gif':
                        break;
                    default:
                        return false;
                }
            },
            dest: './public/bucket/',
            onFileSizeLimit: function (file) {
                console.log('Failed: The photo is too big. ', file.originalname);
                fs.unlinkSync('./' + file.path); // delete the partially written file
            },
            onFileUploadComplete: function(file) {
                req.uploadedFile = file.name;
                req.uploadFilePath = file.path;
            },
            onParseEnd: function(req, next) {
                var postObj = {
                    Title: '',
                    Details: '',
                    Category: ''
                };

                for(var prop in postObj) {
                    if(!req.body.hasOwnProperty(prop)) {
                        console.log(prop + ' is empty');
                        if(req.uploadedFile) {
                            fs.unlinkSync('./' + req.uploadFilePath);
                        }
                        res.send({
                           msg: 'Something went wrong'
                        });
                        return;
                    }
                }
                next();
            }
        });
        upload(req, res, next);
    }
};








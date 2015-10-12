/**
 * Created by ahtasham on 25/01/15.
 */
var Post = require('./../models/posts');

/* profile post */
exports.createPost = function(req, res) {

    var postObj = {
        Title: '',
        Details: '',
        Category: ''
    };

    for(var prop in postObj) {
        if(req.body.hasOwnProperty(prop)){
            postObj[prop] = req.body[prop];
        }
    }

    if(req.uploadFilePath) {
        postObj.Photo = req.uploadedFile;
    }

    var post = new Post(postObj);
    post.createPost(req.session.personId, function(err, data){
        if(err) {
            console.log(err);
            res.send({
                msg: 'Something went wrong',
                error: err
            });
        } else {
            res.send({
                msg: 'Post created'
            });
        }
    });
};
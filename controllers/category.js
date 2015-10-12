/**
 * Created by ahtasham on 01/01/15.
 */
/* Show profile category page */
var Category = require('./../models/category');;

exports.indexCategory = function(req, res){
    res.render('category/category', {
        title: 'Category Settings',
        userProfile: req.userProfile,
        session: req.session,
        categories: req.userCategory
    });

};

//display categories in json
exports.jsonCategory = function(req, res) {

    var category = new Category(req.session);
    category.getCategoryInJSON(function(err, categories){
        if(err) {
            res.send({
                msg: err
            });
        }else {
            res.json({
                username: req.session.user,
                categories: categories
            });
        }
    });
};



/* Create category */
exports.addCategory = function(req, res) {

    if(!req.body.frmCategory) {
        res.send({
            msg: 'frmCat not found'
        });
    } else {
        var category = new Category(req.body);
        category.AddCategory(req.session.personId,function(err, data){
            if(err) {
                console.log(err);
                res.send({
                    msg: err
                })
            } else {
                res.send({
                    msg: data
                });
            }
        });
    }
};

/* Remove Category */
exports.rmCategory = function(req, res) {
    if(!req.body.catDelId) {
        res.send({
            msg: 'Something went wrong.'
        });
    } else {

        var category = new Category(req.body);
        category.rmCategory(req.session.personId, function(err, data){
            if(err) {
                console.log(err);
                res.send({
                   msg: err
                });
            } else {
                console.log(data);
                res.send({
                    msg: data
                });
            }
        });
    }
}
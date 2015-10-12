/**
 * Created by ahtasham on 06/02/15.
 */
var Posts = require("./../models/posts");

exports.index = function(req, res) {
    var sQuery = req.query.s;
    var regQuery = new RegQuery(sQuery);
    sQuery = regQuery.reg();

    res.render("search/search", {
        title: 'NodeBlog',
        sQuery: sQuery,
        session: req.session
    });
};

exports.getPosts = function(req, res) {
    var sQuery = req.params.query;
    var regQuery = new RegQuery(sQuery);
    sQuery = regQuery.reg();

    var obj = {
        sQuery: sQuery
    };

    var posts = new Posts(obj);
    posts.searchPosts(function(err, posts){
        if (err) {
            res.json({
                msg: err
            });
        } else {
            res.json(posts);
        }
    })

};

function RegQuery(str) {
    this.str = str;
    var parent = this;

    this.reg = function() {
        var string = parent.str.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
        string = string.replace(/\s+/g, ' ').trim();
        return string;
    }
}
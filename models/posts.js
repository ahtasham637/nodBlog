/**
 * Created by ahtasham on 31/12/14.
 */
var db = require('./connect');
var Oriento = require('oriento');
var Category = require('./category');
var cmFunctions = require('./../controllers/commonFunctions');

function Posts(obj) {
    this.obj = obj;
    var parent = this;

    this.getPostsByUsername = function(callback) {

        db.select('expand( out("Wrote") )').from('Person').where({
            'User.Username': parent.obj
        }).order('Time desc').fetch('Category:1').all().then(function(posts){
            return callback(null, posts);
        }).catch(function(err){
            return callback(err);
        });
    };

    this.getHomePosts = function(callback) {
        var getPosts = 'Select Title, Details, Url, Time, Photo, Category.CatUrl as CatUrl, ';
        getPosts += 'in("Wrote").User.Username as Username, in("Wrote").Name as Name, in("Wrote").Photo as ProfilePhoto ';
        getPosts += 'from (SELECT EXPAND( $c ) LET ';
        getPosts += '$a = ( SELECT expand( out("Wrote") ) from '+ parent.obj.personId +' ), ';
        getPosts += '$b = ( select expand( out("Follow").out("Wrote") ) from '+ parent.obj.personId +' ), ';
        getPosts += '$c = UNIONALL( $a, $b )) order by Time desc';

        db.query(getPosts).then(function(posts){
            return callback(null, posts);
        }).catch(function(err){
            return callback(err);
        });
    };

    this.getPostsByCategory = function(callback) {
        var getPostsQuery = 'select Title, Details, Photo, Url, Time, Category.CatName as Category, ';
        getPostsQuery += 'Category.CatUrl as CatUrl, in("Wrote").Name[0] as Name, ';
        getPostsQuery += 'in("Wrote").User.Username[0] as Username, in("Wrote").Photo[0] as ProfilePhoto from Posts ';
        getPostsQuery += 'where Category.CatUrl = "'+ parent.obj.catUrl  +'" ';
        getPostsQuery += 'And in("Wrote").User.Username = ["'+ parent.obj.username +'"] order by Time desc';

        db.query(getPostsQuery).then(function(posts){
            if(posts.length > 0) {
                posts.forEach(function(entry){
                    entry.Time = new Date(entry.Time).customFormat('#MMMM# #DD#, #YYYY#');
                });
            }
            return callback(null, posts);
        }).catch(function(err){
            console.log(err);
            return callback(err);
        });
    };

    this.getSinglePost = function(callback) {

        var query = 'select from Posts where in("Wrote").User.Username = ["'+ parent.obj.username +'"] And Url = "'+ parent.obj.postUrl +'"';

        db.query(query).then(function(post){
            return callback(null, post[0]);
        }).catch(function(err){
            return callback(err);
        });
    };
    this.createPost = function(personId, callback) {
        var category = new Category();
        category.getCatByUrl(personId, parent.obj.Category, function(err, cat){
            if(err){
                return callback(err);
            } else {
                var time = new Date().getTime();

                parent.obj.Title = cmFunctions.commonRmSpace(parent.obj.Title);
                parent.obj.Details = cmFunctions.commonRmSpace(parent.obj.Details);
                var regTitle = new RegTitle(parent.obj.Title);
                var regDetails = new RegDetails2(parent.obj.Details);
                parent.obj.Title = regTitle.rmSpFromTitle();
                parent.obj.Details = regDetails.regHtml();
                parent.obj.Url = parent.obj.Title.trim() + ' ' + time;
                parent.obj.Url = parent.obj.Url.trim().replace(/\W+/g, '-').toLowerCase();
                parent.obj.Title = regTitle.regAmp();
                parent.obj.Details = cmFunctions.commonRmSpace(parent.obj.Details);
                parent.obj.Category = cat[0]['@rid'];
                parent.obj.Time = time;

                console.log(parent.obj);

                db
                    .let('Post', function (s) {
                        s.create('vertex', 'Posts').set(parent.obj);
                    })
                    .let('Person', function (s) {
                        s.select().from(personId);
                    })
                    .let('wroteEdge', function(s){
                        s.create('edge', 'Wrote')
                            .from('$Person')
                            .to('$Post')
                    })
                    .commit()
                    .return('$wroteEdge')
                    .one()
                    .then(function (edge) {
                        return callback(null, edge);
                    })
                    .catch(function(err){
                        return callback(err);
                    });
            }
        });
    };
    this.updatePost = function(callback) {
        var regDetails = new RegDetails(parent.obj.details);
        parent.obj.details = regDetails.regHtml();
        var update = 'Update Posts set Details = "'+  parent.obj.details + '"';
        update += ' where in("Wrote").@rid = ['+ parent.obj.personId +'] And';
        update += ' Url = "'+ parent.obj.postUrl +'"';
        db.exec(update).then(function(response){
            if(response.results[0].content == 1) {
                console.log('Updated');
                return callback(null, response);
            } else {
                console.log('There was an error');
                return callback('There was an error');
            }
        }).catch(function(err){
            console.log(err);
            return callback(err);
        });
    };
    this.deletePost = function(callback) {
        var delPost = 'delete vertex Posts where Url = "'+ parent.obj.postUrl +'" And';
        delPost += ' in("Wrote").@rid = ['+ parent.obj.personId +']';

        db.exec(delPost).then(function(response){
            if(response.results[0].content == 1) {
                console.log('Deleted');
                return callback(null, response);
            } else {
                console.log('There was an error');
                return callback('There was an error');
            }
        }).catch(function(err){
            console.log(err);
            return callback(err);
        });
    };
    this.searchPosts = function(callback) {
        var query = 'select Title, Details.substring(0, 250), Url, Time, Category.CatUrl as CatUrl, ';
        query += 'in("Wrote").Name[0] as Name, in("Wrote").User.Username[0] as Username, ';
        query += 'in("Wrote").Photo[0] as ProfilePhoto from Posts ';
        query += 'where any() like "%'+ parent.obj.sQuery +'%" limit 5 order by Time desc';

        db.query(query).then(function(posts){
            if(posts.length > 0) {
                posts.forEach(function(entry){
                    var reg = new RegExp(parent.obj.sQuery, 'gi');
                    entry.Details = entry.Details.replace(reg, '<span class="highlighted">'+ parent.obj.sQuery +'</span>');
                })
            }
            return callback(null, posts);
        }).catch(function(err){
            return callback(err);
        });
    };
}

function RegTitle(title) {
    this.title = title;
    this.rmSpFromTitle = function() {
        var title = this.title.replace(/[`~^*()_|+\=?;:'"<>\{\}\[\]\\\/]/gi, '');
        return title;
    };
    this.regAmp = function() {
        var title = this.title.replace(/\&+/g, '&amp;');
        return title;
    };
}

function RegDetails(details) {
    this.details = details;

    this.regHtml = function() {
        var s = this.details.replace(/</g, "&lt;");
        s = s.replace(/>/g,"&gt;");
        s = s.replace(/\'/g, "\\'");
        s = s.replace(/\"/g, '\\"');
        return s;
    }
}

function RegDetails2(details) {
    this.details = details;

    this.regHtml = function() {
        var s = this.details.replace(/</g, "&lt;");
        s = s.replace(/>/g,"&gt;");
        return s;
    }
}

module.exports = Posts;
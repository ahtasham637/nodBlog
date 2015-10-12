/**
 * Created by ahtasham on 31/12/14.
 */
var db = require('./connect');
var cmFunction = require('./../controllers/commonFunctions');

function Category(obj){
    this.obj = obj;

    //Get Category In JSON
    this.getCategoryInJSON = function(callback) {
        db.select().from('Category').where({
            Person: this.obj.personId
        }).all().then(function(cats){
            console.log(cats);
            return callback(null, cats);
        }).catch(function(err){
            return callback(err);
        });
    };

    //get Category by Url
    this.getCatByUrl = function(personId, catUrl, callback) {
        db.select().from('Category').where({
            Person: personId,
            CatUrl: catUrl
        }).all().then(function(category){
            return callback(null, category);
        }).catch(function(err){
            return callback(err);
        });
    };

    //Add Category
    this.AddCategory = function(personId, callback) {

        this.obj.frmCategory = cmFunction.commonRmSpace(this.obj.frmCategory);
        var regCat = new RegCat(this.obj.frmCategory);
        this.obj.frmCategory = regCat.removeSpecialCharacters();
        this.obj.frmCatUrl = this.obj.frmCategory.replace(/\W+/g, '-').toLowerCase();
        var insObj = this.obj;
        this.getCatByUrl(personId, insObj.frmCatUrl, function(err, data){
            if(err) {
                return callback(err);
            } else {
                if(data.length > 0) {
                    return callback('Category already exist');
                } else {
                    var time = new Date().getTime();
                    var insCat = 'insert into Category set ';
                    insCat += 'Person = '+ personId +', CatName = "'+ insObj.frmCategory +'", ';
                    insCat += 'CatUrl = "'+ insObj.frmCatUrl +'", Time = '+ time +'';
                    db.query(insCat).then(function(cat){
                        return callback(null, cat);
                    }).catch(function(err){
                        return callback(err);
                    });
                }
            }
        });
    };
    this.rmCategory = function(personId, callback) {
        db.exec('delete vertex Category where Person=:person And @rid=:rid', {
            params: {
                person: personId,
                rid: this.obj.catDelId
            }
        }).then(function(response){
            return callback(null, response);
        }).catch(function(err){
            return callback(err);

        });
    };

    function RegCat(category) {
        this.category = category;
        this.removeSpecialCharacters = function() {
            var catName = this.category.replace(/[`~!@#$%^&*()_|+\.=?;:'",<>\{\}\[\]\\\/]/gi, '');
            return catName;
        }
    }
}

module.exports = Category;








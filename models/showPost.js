/**
 * Created by ahtasham on 31/12/14.
 */
//var db = require('./connect');

//exports.getSinglePost = function(username, url, callback) {
    //db
    //    .query('select @this.toJSON("fetchPlan:Category:1") from Posts where User.Username = "'+ username +'" And Url = "'+ url +'" limit 1')
    //    .then(function(post){
    //        var parsedObj = JSON.parse(post[0]['this']);
    //        var postDate = new Date(parseInt(parsedObj['Time']));
    //        parsedObj['Time'] = postDate.toString();
    //
    //        var subDesc = parsedObj.Details;
    //        if(subDesc.length > 175) {
    //            parsedObj.subDetails = subDesc.substring(0, 175);
    //        }
    //
    //        console.log(parsedObj);
    //        return callback(null, parsedObj);
    //})
    //    .catch(function(err){
    //        console.log(err);
    //        return callback(err);
    //});
//};

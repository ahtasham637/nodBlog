/**
 * Created by ahtasham on 31/12/14.
 */
/* 404 index page */
exports.index = function(req, res){
    res.status(404);
    //res.send(req.session.rid);
    res.render('404/404', {
        title: '404: File Not Found',
        session: req.session
    });
};


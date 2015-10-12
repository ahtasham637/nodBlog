/**
 * Created by ahtasham on 20/01/15.
 */

exports.index = function(req, res){
    //res.send(req.session.rid);
    if(req.session.rid) {
        res.status(404);
        res.redirect('/404');
    }
    res.render('401/401', {
        title: '401: Unauthorize',
        session: req.session
    });
};

/**
 * Created by ahtasham on 31/12/14.
 */

module.exports = {
    requestHandler: function(req, res, next){
        ip = req.ip;
        console.log('%s %s', req.method, req.url + ' request from ip: ' + req.ip);
        next();
    },
    authorize: function(req, res, next){
        if(!req.session.rid){
            res.status(401);
            res.redirect('/401');
        } else {
            next(); //
        }
    }
};
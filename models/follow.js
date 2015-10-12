/**
 * Created by ahtasham on 26/01/15.
 */
var db = require('./connect');
var cmFunction = require('./../controllers/commonFunctions');

function FollowUser(fromPerson, toPerson) {
    this.fromPerson = fromPerson;
    this.toPerson = toPerson;

    var parent = this;

    //Follow User
    this.Follow = function(callback) {
        db.select().from('Follow').where({
            out: parent.fromPerson,
            'in.User.Username': parent.toPerson
        }).one().then(function(data){
            if(typeof data === 'undefined' || cmFunction.isEmpty(data)){
                db
                    .let('fromPerson', function(s){
                        s.select().from(parent.fromPerson);
                    })
                    .let('toPerson', function(s){
                        s.select().from('Person').where({
                            'User.Username': parent.toPerson
                        });
                    })
                    .let('followEdge', function(s){
                        s.create('edge', 'Follow')
                            .from('$fromPerson')
                            .to('$toPerson')
                    })
                    .commit()
                    .return('$followEdge')
                    .one()
                    .then(function(edge){
                        return callback(null, edge);
                    }).catch(function(err){
                        return callback(err);
                    });
            } else {
                db
                    .let('fromPerson', function(s){
                        s.select().from(parent.fromPerson);
                    })
                    .let('toPerson', function(s){
                        s.select().from('Person').where({
                            'User.Username': parent.toPerson
                        });
                    })
                    .let('followEdge', function(s){
                        s.delete('edge', 'Follow')
                            .from('$fromPerson')
                            .to('$toPerson')
                    })
                    .commit()
                    .return('$followEdge')
                    .one()
                    .then(function(edge){
                        return callback(null, edge);
                    }).catch(function(err){
                        return callback(err);
                    });
            }
        }).catch(function(err){
            return callback(err);
        });
    };

    this.getSuggestions = function(obj, callback) {
        var suggestions = 'select Name, Photo, User.Username as Username, in("Follow").Name[0] as byy from ';
        suggestions += '(select expand( out("Follow").out("Follow") ) from '+ obj.personId +') ';
        suggestions += 'where @rid <> ' + obj.personId;
        suggestions += ' And in("Follow") not contains (@rid in ['+ obj.personId +'])';

        db.query(suggestions).then(function(people){
            return callback(null, people);
        }).catch(function(err){
            return callback(err);
        });
    };
}

module.exports = FollowUser;
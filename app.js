var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var qt = require('quickthumb');
var routers = require('./routes/allRoutes');

app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: '12112122232',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routers);
app.use('/photo/pub/nb/', qt.static(path.join(__dirname, 'public/bucket')));

// Handle 404
app.use(function(req, res) {
    res.status(400);
    res.redirect('/404');
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500).end(error.message);
});


module.exports = app;

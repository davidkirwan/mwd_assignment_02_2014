/*
David Kirwan 00346128
MSc Communication Software 2014
Mobile Application Development
*/

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var map = require('./routes/map');
var auth = require('./routes/auth');
var followers = require('./routes/followers');
var following = require('./routes/following');
var gists = require('./routes/gists');
var repositories = require('./routes/repositories');
var user = require('./routes/user');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/map', map.user);
app.get('/auth/github', auth.redirect);
app.get('/auth/github/callback', auth.callback);
app.get('/auth/github/status', auth.status);
app.get('/auth/logout', auth.logout);
app.get('/user/:user', user.status);
app.get('/user/following/:user', user.following);
app.put('/user/following/:user', user.follow);
app.get('/user/:user/followers', followers.list);
app.get('/user/:user/following', following.list);
app.get('/user/:user/gists', gists.list);
app.get('/user/:user/repositories', repositories.list);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

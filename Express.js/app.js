'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const csrf = require("csurf");

const csrfMiddleware = csrf({ cookie: true });



//initialize firebase before requiring other js files
const admin = require("firebase-admin");
var serviceAccount = require("./firebase_key/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://huse-1ad4c.firebaseio.com"
});

//html pages
var pages = require('./routes/pages');
//css,js,photos
var assets = require('./routes/assets');
//post & data retrieve
var api = require('./routes/api');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrfMiddleware);

//allow server to use json files
app.use(express.json());

app.use('/', pages);
app.use('/assets', assets);
app.use('/api', api);


app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/404.html'));
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

//数据库配置
var settings = require("db/setting");

//动态助手
var dynamicHelpers = require("./helpers/dynamic/dynamic-helper");

var routes = require('./routes/index');
var users = require('./routes/users');
var filters = require('./routes/filters');
var login = require('./routes/login');
var logout = require('./routes/logout');
var reg = require('./routes/reg');
var post = require('./routes/post');
var comment = require('./routes/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


//会话控制
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        db : settings.db,
        host:settings.host,
        port:settings.port
    })
}));

app.use(filters);
app.use(function(req, res, next){
    res.locals.user = dynamicHelpers.user(req,res);
    res.locals.error = dynamicHelpers.error(req,res);
    res.locals.success = dynamicHelpers.success(req,res);
    res.locals.info = dynamicHelpers.info(req,res);
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/reg', reg);
app.use('/post', post);
app.use('/comment', comment);




/// catch 404 and forward to error handler
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
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;

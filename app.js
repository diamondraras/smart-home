require('./config/config'); //instantiate configuration variables
require('./global_functions'); //instantiate global functions

console.log("Environment:", CONFIG.app)

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require("path");

const v1 = require('./routes/v1');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());

//DATABASE
const models = require("./models");

// CORS
app.use(function(req, res, next) {
    // Website to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next middleware
    next();
});

app.use('/api', v1);

//********* Angular Frontend ************/
app.use(
    "/",
    express.static(path.join(__dirname, "./dist/smartminds"))
  );

// catch 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    //only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
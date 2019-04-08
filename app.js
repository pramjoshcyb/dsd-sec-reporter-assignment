
// IMPORTS ======================================
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // Logs requests/responses
const indexRouter = require('./routes/index');
const app = express(); //

// ===============================================

// View Engine =============
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));

app.use(express.json({ type: 'application/csp-report' }));
app.use(express.json({ type: 'application/json' }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Adds this to add Content Security Policy on all responses
app.get('/*', function (req, res, next) {

    /* The Content-Security-Policy, see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
        allows for directives to made which control what resources a web site will allow to load.
    */

    // This adds a Content Security Policy Report Only to all responses 

    res.header("Content-Security-Policy-Report-Only", "default-src 'self'; style-src https://*; script-src cdnjs.cloudflare.com; require-sri-for script style; connect-src 'self'; report-uri http://localhost:3000/report;");
    
    // Try adding `https://stackpath.bootstrapcdn.com` into the style-src directive
    
    next();
});

app.use('/', indexRouter);

module.exports = app;

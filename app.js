'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const React = require('react');
global.React = React;

const index = require('./src/routes/index');
const submit = require('./src/routes/submit');
const update = require('./src/routes/update');

const notFound = require('./src/middlewares/notFound');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressValidator());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/submit', submit);
app.use('/update', update);

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;

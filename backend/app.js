var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamersRouter = require('./routes/gamers');
const questionsRouter = require('./routes/questions')

const db = require('./db')
const dbHelpers = require('./helpers/dbHelpers')(db);


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/gamers', gamersRouter(dbHelpers));
app.use('/api/questions', questionsRouter(dbHelpers));


app.listen(3001, () => {
    console.log("Listening on 3001");
} )
module.exports = app;

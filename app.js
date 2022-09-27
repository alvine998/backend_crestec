var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jobsRouter = require('./routes/jobs')
var mailsRouter = require('./routes/mails')
var storagesRouter = require('./routes/storages')
var purchasesRouter = require('./routes/purchases')
var helpdesksRouter = require('./routes/helpdesks')

require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')

var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet({ contentSecurityPolicy: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jobs', jobsRouter)
app.use('/mails', mailsRouter)
app.use('/storages', storagesRouter)
app.use('/purchases', purchasesRouter)
app.use('/helpdesks', helpdesksRouter)

app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mqttRouter = require('./routes/mqttRouter');

// var mqttHandler = require('./mqttHandlerWithClient');

var app = express();

// /**
//  * Mqtt Handler 실행 모듈
//  */
// var mqttClient = new mqttHandler();
// mqttClient.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mqtt', mqttRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const spdy = require('spdy')
const fs = require('fs')
const port = 8089;

const options = {
  key: fs.readFileSync(__dirname + '/self.key'),
  cert:  fs.readFileSync(__dirname + '/self.crt')
};

spdy
    .createServer(options, app)
    .listen(port, (error) => {
      if (error) {
        console.error(error)
        return process.exit(1)
      } else {
        console.log('Listening on port: ' + port + '.')
      }
    });

module.exports = app;

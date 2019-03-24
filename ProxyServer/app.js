var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
const port = 8081;

app.get('/h2', (req, res) => {
  res.status(200).json({message: 'ok'})
});

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

// mqtt : client to server - use webSocket
var WebSocket = require("ws").Server;
var wss = new WebSocket({ port: 7700 });

// 연결이 수립되면 클라이언트에 메시지를 전송하고 클라이언트로부터의 메시지를 수신한다
wss.on("connection", function connection(ws) {
  console.log('connected!')
  // ws.send("Hello! I am a server.");

  ws.send('hi')
  ws.on("message", function incomming(message) {
    console.log("Received: %s", message);
  });
});

module.exports = app;

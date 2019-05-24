var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var mqttRouter = require('./routes/mqttRouter');
var h2Router = require('./routes/h2');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/mqtt', mqttRouter);
app.use('/h2', h2Router);

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

// CORS 설정
// app.use(cors());
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

const spdy = require('spdy')
const fs = require('fs')
const port = 8083;

const options = {
    key: fs.readFileSync(__dirname + '/self.key'),
    cert: fs.readFileSync(__dirname + '/self.crt')
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

// WebSocket
var WebSocket = require("ws").Server;
var wss = new WebSocket({port: 7700});
var mqttClient;

wss.on("connection", function connection(ws) {
    console.log('connected!')

    ws.on("message", function incomming(message) {
        let messageType = "";
        console.log(typeof message);

        try {
            var object = JSON.parse(message);
            console.log(object);
            messageType = object.type;
        } catch (e) {
            console.log(e);
            messageType = message;
        }

        if (messageType == "mqttStart") {
            mqttClient = new mqttHandler(object.size);

            mqttClient.connect(ws);
            let reqObj = {
                bandwidth: object.bandwidth,
                size: object.size
            };
            mqttClient.sendMessage(JSON.stringify(reqObj));
        } else if (messageType == "testEnd") {
            mqttClient.disconnectWithServer()
        } else {
            console.log("No Start: %s", messageType);
        }
    });
});

// mqtt : client to server - use webSocket
var mqttHandler = require('./mqttHandlerWithClient');

module.exports = app;

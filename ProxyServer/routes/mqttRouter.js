var express = require('express');
var router = express.Router();
var mqttHandler = require('../mqttHandlerWithClient');

/* GET home page. */
router.get('/', function(req, res, next) {
  var mqttClient = new mqttHandler();

  mqttClient.connect();
  mqttClient.sendMessage('give');
  

  res.render('index', { title: 'Mqtt', testImg: ''});
});

module.exports = router;
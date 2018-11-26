var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost:1883');
 
client.on('connect', function () {
    console.log('connected');
    client.subscribe('presence');
    // time check start
    client.publish('presence', 'Hello mqtt');
});
 
client.on('message', function (topic, message) {
      // time check end
      console.log(message.toString());
      client.end();
});

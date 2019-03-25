const mqtt = require('mqtt');

class MqttHandlerClient {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://localhost:1883';
  }
  
  connect(ws) {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('mytopic', {qos: 0}, function () {
      console.log('subs')
    });

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      if(topic == 'mytopic'){
        ws.send(message.toString())
        console.log(message.toString());
        // client.end();
      }
      else {
        console.log('no')
      }
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish('mytopic', message);
  }
}

module.exports = MqttHandlerClient;
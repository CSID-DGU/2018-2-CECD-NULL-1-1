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
      if(topic == 'mytopic' && message.toString() != "give"){
        ws.send(message.toString())
        console.log(JSON.parse(message.toString()).number);
        // console.log(message.toString());
      }
      else {
        console.log('no')
      }
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    console.log('pub')
    this.mqttClient.publish('mytopic', message);
  }

  // Sends a mqtt message to topic: mytopic
  disconnectWithServer() {
    console.log('disconnected')
    this.mqttClient.end()
  }
}

module.exports = MqttHandlerClient;
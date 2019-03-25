const mosca = require('mosca');
const fs = require('fs');

class MqttHandler {
    constructor(portNum){        
        var settings = {
            port: portNum,
        };
        this.portNum = portNum
        this.server = new mosca.Server(settings);
    }

    mqttConnect(){
        var mqttServer = this.server;

        this.server.on('clientConnected', function(client) {
            console.log('client connected', client.id);
        });
    
        // fired when a message is received
        this.server.on('published', function(packet, client) {
            if(packet.topic == "mytopic" && client != null) {
                fs.readFile("./public/images/testImage.jpeg", function(error, data){
                    var newPacket = {
                        topic: packet.topic,
                        payload: data.toString('base64'),
                        // payload: 'RPI send',
                        retain: packet.retain,
                        qos: packet.qos
                    };

                    console.log('newPacket', newPacket);

                    mqttServer.publish(newPacket, function() {
                        console.log('done!');
                    });
                });
            }
        });
    
        this.server.on('ready', setup);

        // fired when the mqtt server is ready
        function setup() {
            console.log('Mosca server is up and running');
        }
    }

}

module.exports = MqttHandler;
const mosca = require('mosca');
const fs = require('fs');

var imageList = new Array
for(var n=1; n<101; n++){
    imageList.push("./public/images/testImage"+n+".jpeg")
}

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
                imageList.forEach(function (item, index, array) {
                    fs.readFile(item, function(error, data){
                        var sendData = {
                            'number': index+1,
                            'image': data.toString('base64')
                        }
                        console.log('sendData', sendData);

                        var newPacket = {
                            topic: packet.topic,
                            payload: JSON.stringify(sendData),
                            // payload: 'RPI send',
                            retain: packet.retain,
                            qos: packet.qos
                        };

                        console.log('newPacket', newPacket);

                        mqttServer.publish(newPacket, function() {
                            console.log('done!');
                        });
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
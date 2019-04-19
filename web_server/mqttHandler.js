const mosca = require('mosca');
const fs = require('fs');

// var imageList = new Array(901);
var imageList = [];
for (var n = 1; n <= 100; n++) {
    // var tempUrl0 = "./public/images/mqtt_900/image_part_" + n + ".jpg";
    // var tempUrl1 = "./public/images/mqtt_900/image_part_0" + n + ".jpg";
    // var tempUrl2 = "./public/images/mqtt_900/image_part_00" + n + ".jpg";
    // if (n < 10)
    //     // tempUrl += "00";
    //     tempUrl.concat("00");
    // else if (n < 100)
    //     // tempUrl += "0";
    //     tempUrl.concat("0");
    // // tempUrl += n + ".jpg";
    // tempUrl = tempUrl + n + ".jpg";
    // console.log(tempUrl);
    // console.log(typeof tempUrl);
    var url = "./public/images/400B/50x50/blue" + n + ".jpg";
    // if (n < 10)
    //     url = tempUrl2;
    // else if (n >= 10 && n < 100)
    //     url = tempUrl1;
    // else
    //     url = tempUrl0;


    // var url = "./public/images/mqtt/" + n + ".jpg";
    imageList.push(url);
}

class MqttHandler {
    constructor(portNum) {
        var settings = {
            port: portNum,
        };
        this.portNum = portNum
        this.server = new mosca.Server(settings);
    }

    mqttConnect() {
        var mqttServer = this.server;

        this.server.on('clientConnected', function (client) {
            console.log('client connected', client.id);
        });

        // fired when a message is received
        this.server.on('published', function (packet, client) {
            if (packet.topic == "mytopic" && client != null) {
                imageList.forEach(function (item, index, array) {
                    console.log("index : ", index, item);
                    fs.readFile(item, function (error, data) {
                        console.log(typeof data);
                        var sendData = {
                            'number': index + 1,
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

                        mqttServer.publish(newPacket, function () {
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
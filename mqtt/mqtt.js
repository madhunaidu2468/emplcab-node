var mqtt = require('mqtt');
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
var client  = mqtt.connect('mqtt://broker.hivemq.com');
var cab=require('../dao/cab');


client.on('connect', function () {
  client.subscribe('emplcablocation');
  client.publish('emplcablocation', '{\"cabId\":1}');
})

client.on('message', function (topic, message) {
  console.log('topic', topic);
  console.log('message', message.toString());
 // client.end()
    cab.updateLocation(message);
})

var push=function(topic, msg){
    client.publish(topic, msg);
}

module.exports = {
    push: push
}
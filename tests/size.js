var newtifryPro = require('../lib/NewtifryPro');

var apikey = 'Your APIKEY';
var registrationIds = [];

try {
  var priv = require('./credentials.js');
  registrationIds.push(priv.privateDeviceId);
  apikey = priv.privateApikey;
} catch (e) {
  console.log('You have to add API_KEY and your device RegistrationId');
  process.exit();
}

var message = {
  data: {
    type: 'ntp_message',
    priority:	3,
    source: new Buffer('Test').toString('base64'),
    notify: 1
  }
};

// size of 2070
//message.data.message =  new Buffer(1459).toString('base64'), // OK
message.data.message =  new Buffer("<h3>Hosts status report</h3><p>Host redmi(192.168.1.222) is <b><font color='green'>resurrected</font></b></p><p>Host routeur(192.168.1.1) is <b><font color='blue'>alive</font></b></p><p>Host domo10(192.168.1.120) is <b><font color='blue'>alive</font></b></p><p>Host Ardomo10(192.168.1.135) is <b><font color='blue'>alive</font></b></p><p>Host TLWR710N(192.168.1.141) is <b><font color='blue'>alive</font></b></p><p>Host PS3(192.168.1.150) is <b><font color='blue'>alive</font></b></p><p>Host portail(192.168.1.184) is <b><font color='blue'>alive</font></b></p><p>Host Lolin2(192.168.1.188) is <b><font color='blue'>alive</font></b></p><p>Host undefined(192.168.1.194) is <b><font color='purple'>dead</font></b></p><p>Host undefined(192.168.1.198) is <b><font color='purple'>dead</font></b></p><p>Host ThunderPC(192.168.1.20) is <b><font color='blue'>alive</font></b></p><p>Host unknown(192.168.1.201) is <b><font color='blue'>alive</font></b></p><p>Host Epad(192.168.1.22) is <b><font color='blue'>alive</font></b></p><p>Host debianserver(192.168.1.230) is <b><font color='blue'>alive</font></b></p><p>Host printer(192.168.1.231) is <b><font color='blue'>alive</font></b></p><p>Host WDTVLive(192.168.1.237) is <b><font color='blue'>alive</font></b></p><p>Host unknown(192.168.1.243) is <b><font color='blue'>alive</font></b></p><p>Host undefined(192.168.1.244) is <b><font color='purple'>dead</font></b></p><p>Host undefined(192.168.1.251) is <b><font color='purple'>dead</font></b></p><p>Host unknown(192.168.1.253) is <b><font color='blue'>alive</font></b></p><p>Host chip(192.168.1.32) is <b><font color='blue'>alive</font></b></p><p>Host iPad(192.168.1.37) is <b><font color='blue'>alive</font></b></p><p>Host unknown(192.168.1.4) is <b><font color='blue'>alive</font></b></p><p>Host ipcam2(192.168.1.8) is <b><font color='blue'>alive</font></b></p><p>Host ipcam3(192.168.1.9) is <b><font color='blue'>alive</font></b></p><p>Host domo9(192.168.1.90) is <b><font color='blue'>alive</font></b></p>").toString('base64'); // OK
console.log('message size: ' + message.data.message.length);
message.data.title = new Buffer('size de').toString('base64');

// only for NewtgifryPro >= v2.xx
/*
newtifryPro.sendMessageToTopic(message, apikey, 'redmi', function (err, data) {
  if (err === null) {
    console.log(data);
  } else {  
    console.log(err);
  }
});
*/
var ooMessage = new newtifryPro.NewtifryProMessage();
ooMessage.setSenderId(apikey);
ooMessage.setSource('Test');
ooMessage.setTopic('redmi');
ooMessage.setTitle('oo test');
ooMessage.setMessage("<h3>Hosts status report</h3><p>Host redmi(192.168.1.222) is <b><font color='green'>resurrected</font></b></p><p>Host routeur(192.168.1.1) is <b><font color='blue'>alive</font></b></p><p>Host domo10(192.168.1.120) is <b><font color='blue'>alive</font></b></p><p>Host Ardomo10(192.168.1.135) is <b><font color='blue'>alive</font></b></p><p>Host TLWR710N(192.168.1.141) is <b><font color='blue'>alive</font></b></p><p>Host PS3(192.168.1.150) is <b><font color='blue'>alive</font></b></p><p>Host portail(192.168.1.184) is <b><font color='blue'>alive</font></b></p><p>Host Lolin2(192.168.1.188) is <b><font color='blue'>alive</font></b></p><p>Host undefined(192.168.1.194) is <b><font color='purple'>dead</font></b></p><p>Host undefined(192.168.1.198) is <b><font color='purple'>dead</font></b></p><p>Host ThunderPC(192.168.1.20) is <b><font color='blue'>alive</font></b></p><p>Host unknown(192.168.1.201) is <b><font color='blue'>alive</font></b></p><p>Host Epad(192.168.1.22) is <b><font color='blue'>alive</font></b></p><p>Host debianserver(192.168.1.230) is <b><font color='blue'>alive</font></b></p><p>Host printer(192.168.1.231) is <b><font color='blue'>alive</font></b></p><p>Host WDTVLive(192.168.1.237) is <b><font color='blue'>alive</font></b></p><p>Host unknown(192.168.1.243) is <b><font color='blue'>alive</font></b></p><p>Host undefined(192.168.1.244) is <b><font color='purple'>dead</font></b></p><p>Host undefined(192.168.1.251) is <b><font color='purple'>dead</font></b></p><p>Host unknown(192.168.1.253) is <b><font color='blue'>alive</font></b></p><p>Host chip(192.168.1.32) is <b><font color='blue'>alive</font></b></p><p>Host iPad(192.168.1.37) is <b><font color='blue'>alive</font></b></p><p>Host unknown(192.168.1.4) is <b><font color='blue'>alive</font></b></p><p>Host ipcam2(192.168.1.8) is <b><font color='blue'>alive</font></b></p><p>Host ipcam3(192.168.1.9) is <b><font color='blue'>alive</font></b></p><p>Host domo9(192.168.1.90) is <b><font color='blue'>alive</font></b></p>");
ooMessage.sendToTopic(function (err, data) {
  if (err === null) {
    console.log(data);
  } else {  
    console.log(err);
  }
});




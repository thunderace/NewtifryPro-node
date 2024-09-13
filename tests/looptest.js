var newtifryPro = require('../lib/NewtifryPro');

var registrationIds = [];

try {
  var priv = require('./credentials.js');
  registrationIds.push(priv.privateDeviceId);
} catch (e) {
  console.log('You have to add API_KEY and your device RegistrationId');
  process.exit();
}

var message = {
  data: {
    type: 'ntp_message',
    message: new Buffer.from('Test message body').toString('base64'),
    priority:	new Buffer.from('2').toString('base64'),
    title: new Buffer.from('Simple test message').toString('base64'),
    source: new Buffer.from('Test').toString('base64'),
    //state: 1 ,// sticky
    //notify: 1, 
  }
};


//setInterval(send, 20000);
var counter = 0;
newtifryPro.init('../serviceAccount.json');
send();
function send () {
  counter++;
  message.data.title = new Buffer.from(counter.toString()).toString('base64');
	var now = new Date();
	var timestampSplit = now.toISOString().split('.'); 
	message.data.timestamp = timestampSplit[0];
  newtifryPro.sendMessage(message, registrationIds, function (err, data) {
    if (err === null) {
//      console.log(data);
    } else {
      console.log('Error :' + err);
      console.log('Data :' + data);
    }
  });
}

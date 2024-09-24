var newtifryPro = require('../lib/NewtifryPro');

var registrationIds = [];

try {
  var priv = require('./credentials.js');
  registrationIds.push(priv.privateDeviceId);
} catch (e) {
  console.log('You have to add your device RegistrationId');
  process.exit();
}

var message = {
  type: 'ntp_message',
  message: 'Test message body',
  priority:	2,
  title: 'Simple test message',
  source: 'Test',
  //state: 1 ,// sticky
  //notify: 1, 
};


//setInterval(send, 20000);
var counter = 0;
newtifryPro.init('../serviceAccount.json');
/*
or 
newtifryPro.init2((project_id, client_email, private_key);
*/
send();
function send () {
  counter++;
  message.title += counter.toString();
	var now = new Date();
	var timestampSplit = now.toISOString().split('.'); 
	message.timestamp = timestampSplit[0];
  newtifryPro.sendMessage(message, registrationIds, function (err, data) {
    if (err === null) {
//      console.log(data);
    } else {
      console.log('Error :' + err);
      console.log('Data :' + data);
    }
  });
}

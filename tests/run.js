var newtifryPro = require('../lib/NewtifryPro');
var fs = require('fs');

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
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        type: 'ntp_message',
        message: new Buffer('Test message body').toString('base64'),
        priority:	2,
        title: new Buffer('Test message').toString('base64'),
        source: new Buffer('domo2').toString('base64'),
//        url: '', // new Buffer('Test message').toString('base64'),
//        image: '', // new Buffer('Test message').toString('base64'),
//        speak: 1,
//        nocache: 0
    }
};


var now = new Date();
message.data.timestamp = now.toISOString();

newtifryPro.sendMessage(message, apikey, registrationIds, function (err, data) {
	if (err === null) {
		console.log(data);
	} else {
		console.log(err);
	}
});
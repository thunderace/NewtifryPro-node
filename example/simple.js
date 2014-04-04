var newtifryPro = require('../lib/NewtifryPro');
var fs = require('fs');

var apikey = 'Your APIKEY';
var registrationIds = [];
registrationIds.push('You first device ID');
registrationIds.push('You second device ID');

var message = {
	data: {
		type: 'ntp_message',
		message: new Buffer('Test message body').toString('base64'),
		priority:	2,
		title: new Buffer('Test message').toString('base64'),
		source: new Buffer('domo2').toString('base64'),
//		url: new Buffer('url').toString('base64'),
//		image: new Buffer('image url').toString('base64'),
//		speak: 1, // -1 : default app config - 0 : don't speak - 1 : always speak
//		nocache: 0, // -1 : default app config - 0 : don't cache image(s) - 1 always cache images
//		notify : 1 // -1 : default app config - 0 : don't notify - 1 always notify
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
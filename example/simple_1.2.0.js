var newtifryPro = require('../lib/NewtifryPro');
var fs = require('fs');

var apikey = 'Your APIKEY';
var registrationIds = [];
registrationIds.push('You first device ID');
registrationIds.push('You second device ID');


var images = [];
images.push('http://www.newtifry.org/test_newtifry1.jpg');
images.push('http://www.newtifry.org/test_newtifry2.jpg');
images.push('http://www.newtifry.org/test_newtifry3.jpg');
images.push('http://www.newtifry.org/test_newtifry4.jpg');
images.push('http://www.newtifry.org/test_newtifry5.jpg');

var single_image_message = {
	collapseKey: 'demo',	// optional
	delayWhileIdle: true,	// optional
	timeToLive: 3,			// optional
	data: {
		type: 'ntp_message',
		message: new Buffer('Test message body').toString('base64'),
		priority:	2,
		title: new Buffer('Message with one image').toString('base64'),
		source: new Buffer('test').toString('base64'),
		image: new Buffer('http://www.newtifry.org/test_newtifry.jpg').toString('base64'),
		url: '', // new Buffer('https://newtifry.appspot.com').toString('base64'),
//		speak: 1,
//		nocache: 0
    }
};

var five_images_message = {
	collapseKey: 'demo',	// optional
	delayWhileIdle: true,	// optional
	timeToLive: 3,			// optional
	data: {
		type: 'ntp_message',
		message: new Buffer('Test message body').toString('base64'),
		priority:	2,
		title: new Buffer('Message with 5 images').toString('base64'),
		source: new Buffer('test').toString('base64'),
		image1: new Buffer('http://www.newtifry.org/test_newtifry1.jpg').toString('base64'),
		image2: new Buffer('http://www.newtifry.org/test_newtifry2.jpg').toString('base64'),
		image3: new Buffer('http://www.newtifry.org/test_newtifry3.jpg').toString('base64'),
		image4: new Buffer('http://www.newtifry.org/test_newtifry4.jpg').toString('base64'),
		image5: new Buffer('http://www.newtifry.org/test_newtifry5.jpg').toString('base64'),
		url: '', // new Buffer('https://newtifry.appspot.com').toString('base64'),
//		speak: 1,
//		nocache: 0
    }
};


var now = new Date();
message.data.timestamp = now.toISOString();

newtifryPro.sendMessage(single_image_message, apikey, registrationIds, function (err, data) {
	if (err === null) {
		console.log(data);
	} else {
		console.log(err);
	}
});
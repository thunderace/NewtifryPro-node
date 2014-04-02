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
        title: new Buffer('Simple test message').toString('base64'),
        source: new Buffer('Test').toString('base64'),
        state: 1 ,// sticky
        notify: 1
//        url: '', // new Buffer('Test message').toString('base64'),
//        image: '', // new Buffer('Test message').toString('base64'),
//        speak: 1,
//        nocache: 0
    }
};

var single_image_message = {
	collapseKey: 'demo',	// optional
	delayWhileIdle: true,	// optional
	timeToLive: 3,			// optional
	data: {
		type: 'ntp_message',
		message: new Buffer('Test message body').toString('base64'),
		priority:	2,
		title: new Buffer('Message with one image').toString('base64'),
		source: new Buffer('Test').toString('base64'),
		image: new Buffer('http://www.newtifry.org/test_newtifry1.jpg').toString('base64'),
		url: new Buffer('https://newtifry.appspot.com').toString('base64'),
        state: 2 // locked
//		speak: 1,
    }
};

// only for version 1.2.0
var five_images_message = {
//	collapseKey: 'demo',	// optional
//	delayWhileIdle: true,	// optional
//	timeToLive: 3,			// optional
	data: {
		type: 'ntp_message',
		message: new Buffer('Test message body').toString('base64'),
		priority:	2,
		title: new Buffer('Message with 5 images').toString('base64'),
		source: new Buffer('Test').toString('base64'),
		image1: new Buffer('http://www.newtifry.org/test_newtifry1.jpg').toString('base64'),
		image2: new Buffer('http://www.newtifry.org/test_newtifry2.png').toString('base64'),
		image3: new Buffer('http://www.newtifry.org/test_newtifry3.jpg').toString('base64'),
		image4: new Buffer('http://www.newtifry.org/test_newtifry4.jpg').toString('base64'),
		image5: new Buffer('http://www.newtifry.org/test_newtifry5.jpg').toString('base64'),
		url: new Buffer('https://newtifry.appspot.com').toString('base64')
//		speak: 1,
    }
};


/*
newtifryPro.sendMessage(message, apikey, registrationIds, function (err, data) {
	if (err === null) {
		console.log(data);
	} else {
		console.log(err);
	}
});

single_image_message.data.timestamp = now.toISOString();
newtifryPro.sendMessage(single_image_message, apikey, registrationIds, function (err, data) {
	if (err === null) {
		console.log(data);
	} else {
		console.log(err);
	}
});
*/

newtifryPro.sendMessage(five_images_message, apikey, registrationIds, function (err, data) {
	if (err === null) {
		console.log(data);
	} else {
		console.log(err);
	}
});
